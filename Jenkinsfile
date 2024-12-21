pipeline {
    agent any

    stages {
        stage("Pull") {
            steps {
                script {
                    checkout([
                        $class: 'GitSCM',
                        branches: [[name: "*/${env.BRANCH_NAME}"]],
                        userRemoteConfigs: [[
                            url: 'https://github.com/BSO-Space/SportSphere.git',
                            credentialsId: '3c91d658-54b4-4606-b119-5fd58aa85b28'
                        ]]
                    ])
                }
            }
            post {
                always {
                    echo "Pulling from ${env.BRANCH_NAME}"
                }
                success {
                    echo "Pulled Successfully"
                }
                failure {
                    echo "Pulled Failed"
                }
            }
        }

        stage("Install Dependencies") {
            steps {
                script {
                    sh "npm install"
                }
            }
            post {
                always {
                    echo "Installing Dependencies"
                }
                success {
                    echo "Installed Successfully"
                }
                failure {
                    echo "Installed Failed"
                }
            }
        }

        stage("Build") {
            steps {
                script {
                    sh "npm run build"
                }
            }
            post {
                always {
                    echo "Building"
                }
                success {
                    echo "Built Successfully"
                }
                failure {
                    echo "Build Failed"
                }
            }
        }

        stage("Deploy") {
            when {
                anyOf {
                    branch 'main'
                    branch pattern: 'release/.*'
                }
            }
            steps {
                script {
                    if (env.BRANCH_NAME == 'main') {
                        echo "Deploying using docker-compose.yml"
                        sh "docker compose up -d"
                    } else {
                        echo "Deploying using docker-compose.release.yml"
                        sh "docker compose -f docker-compose.release.yml up -d"
                    }
                }
            }
            post {
                always {
                    echo "Deploying"
                }
                success {
                    echo "Deployment Successful"
                }
                failure {
                    echo "Deployment Failed"
                }
            }
        }
    }
    post {
        success {
            echo "Pipeline execution successful"
        }
        failure {
            echo "Pipeline execution failed"
        }
    }
}
