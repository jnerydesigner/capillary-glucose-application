pipeline {
    agent any
    tools {
        nodejs 'NodeJS_22'
    }
    environment {
        EMAIL_RECIPIENT = 'jander.webmaster@gmail.com'  
        COMMIT_HASH = "${env.GIT_COMMIT}"
        COMMIT_MESSAGE = ''
        COMMIT_RESULT = false
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

                    // Pega a mensagem do commit atual
                    COMMIT_MESSAGE = sh(script: "git log -1 --pretty=%B", returnStdout: true).trim()
                    echo "Última mensagem de commit: $COMMIT_MESSAGE"

                    // Faz o fetch para garantir que temos as últimas alterações
                    sh "git fetch origin"

                    // Verifica se há diferenças entre o branch local e o remoto
                    COMMIT_RESULT = sh(script: "git diff origin/main --exit-code", returnStatus: true)

                    echo "Resultado do Commit: $COMMIT_RESULT"
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

                                echo "Alterações detectadas, rodando o deploy"
                                yarn install
                                yarn build
                                
                                pm2 update strapi-sangue-doce

                                pm2 start "yarn start" --name strapi-sangue-doce --watch  || pm2 restart "yarn start" --name strapi-sangue-doce --watch                                 
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

                                echo "Alterações detectadas, rodando o deploy"
                                yarn install
                                yarn build
                                pm2 update pm2-start.json
                                pm2 start pm2-start.json || pm2 restart pm2-start.json


                                 pm2 update front-sangue-doce
                                
                                pm2 start "yarn start" --name front-sangue-doce --watch  || pm2 restart "yarn start" --name front-sangue-doce --watch 
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
