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
        stage('Install Dependencies') {
            steps {
                sh 'yarn install'
            }
        }
        stage('Build StrapiCMS Blood Sweet') {
            steps {
                script {
                    sh 'yarn build'
                }
            }
        }
        stage('Verify PM2') {
            steps {
                script {
                    sh 'npm install pm2 -g && pm2 status'
                }
            }
        }
        stage('PM2 Start') {
            steps {
                script {
                    sh 'pm2 start ecosystem.json'
                }
            }
        }
    }
}
