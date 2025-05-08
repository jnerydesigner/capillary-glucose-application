pipeline {
    agent any
    tools {
        nodejs 'NodeJS_22'
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
                    // Faz o checkout do código do repositório Git
                    checkout scm
                    
                    // Obtém a mensagem do commit
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

                                yarn install
                                yarn build

                                pm2 stop strapi-sangue-doce
                                pm2 delete strapi-sangue-doce
                                pm2 start "yarn start" --name strapi-sangue-doce
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

                                yarn install
                                yarn build

                                pm2 stop front-sangue-doce
                                pm2 delete front-sangue-doce
                                pm2 start "yarn start" --name front-sangue-doce
                            '
                        """
                    }
                }
            }
        }
    }
}
