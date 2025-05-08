pipeline {
    agent any
    tools {
        nodejs 'NodeJS_22'
    }
    environment {
        EMAIL_RECIPIENT = 'jander.webmaster@gmail.com'  
        COMMIT_HASH = "${env.GIT_COMMIT}"
        COMMIT_MESSAGE = ''
    }
    stages {
        stage('Check Node Version') {
            steps {
                script {
                    def nodeVersion = sh(script: 'node -v', returnStdout: true).trim()
                    echo "Node.js version: ${nodeVersion}"
                }
            }
        }
        stage('Checkout') {
            steps {
                script {
                    checkout scm
                
                    COMMIT_MESSAGE = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                }
            }
        }
        stage("Verificar Instalações") {
            steps {
                sh 'which node'
                sh 'which yarn'
                sh 'which pm2'
            }
        }

        stage('Deploy com PM2 do Strapi') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'SSH_PASSWORD', variable: 'SSH_PASSWORD')]) {
                        sh """
                            sshpass -p '${SSH_PASSWORD}' ssh -o StrictHostKeyChecking=no root@deploy-server '
                                export PATH=/var/lib/jenkins/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/NodeJS_22/bin:$PATH

                                node -v
                                yarn -v

                                cd /var/lib/jenkins/workspace/SangueDoce/strapi-seligadev

                                # Verificar se há alterações no código
                                git fetch origin
                                LOCAL=\$(git rev-parse HEAD)  # Escapando o $ para o Groovy não interferir
                                REMOTE=\$(git rev-parse origin/main)

                                if [ "\$LOCAL" != "\$REMOTE" ]; then
                                    echo "Alterações detectadas, rodando o deploy"

                                    yarn install
                                    yarn build

                                    pm2 stop strapi-sangue-doce || true
                                    pm2 delete strapi-sangue-doce || true
                                    pm2 start "yarn start" --name strapi-sangue-doce
                                else
                                    echo "Sem alterações no código, deploy não necessário"
                                fi
                            '
                        """
                    }
                }
            }
        }



        stage('Deploy com PM2 do Next') {
            steps {
                script {
                    withCredentials([string(credentialsId: 'SSH_PASSWORD', variable: 'SSH_PASSWORD')]) {
                        sh """
                            sshpass -p '${SSH_PASSWORD}' ssh -o StrictHostKeyChecking=no root@deploy-server '
                                export PATH=/var/lib/jenkins/tools/jenkins.plugins.nodejs.tools.NodeJSInstallation/NodeJS_22/bin:$PATH

                                node -v
                                yarn -v

                                cd /var/lib/jenkins/workspace/SangueDoce/front-sangue-doce

                                # Verificar se há alterações no código
                                git fetch origin
                                LOCAL=$(git rev-parse HEAD)
                                REMOTE=$(git rev-parse origin/main)

                                if [ "\$LOCAL" != "\$REMOTE" ]; then
                                    echo "Alterações detectadas, rodando o deploy"

                                    yarn install
                                    yarn build

                                    pm2 stop front-sangue-doce || true
                                    pm2 delete front-sangue-doce || true
                                    pm2 start "yarn start" --name front-sangue-doce
                                else
                                    echo "Sem alterações no código, deploy não necessário"
                                fi
                            '
                        """
                    }
                }
            }
        }

        stage('Send Mail Deploy Success') {
            steps {
                emailext(attachLog: true,
                body: """
                <h2>Build Finalizada - commit: ${COMMIT_MESSAGE} - ${COMMIT_HASH}</h2>
                <p><b>Status:</b> ${currentBuild.currentResult}</p>
                <p><b>Tempo de Execução:</b> ${currentBuild.durationString}</p>
                """,
                subject: '$PROJECT_NAME - Build # $BUILD_NUMBER - $BUILD_STATUS!',
                to: "${EMAIL_RECIPIENT}",
                mimeType: 'text/html'
                )
            }
        }
    }
}
