pipeline {
    agent any
    environment{
        CI = 'true'
    }
    options {
        skipStagesAfterUnstable()
    }
    stages {   
        stage('Build Frontend') {
            steps {
                sh """
                    #echo "not sure what todo here rn..."
                    npm install --prefix frontend
                    npm run build:staging --prefix frontend
                """
            }
        }
        stage('Test Frontend'){
            steps{
                //eventually ill have a way to test
                echo 'testing frontend...' //need echo or build fails
            } 
        }
        stage('Build Backend') {
            steps {
                sh """
                    node --check backend/*.js
                    npm install --prefix backend 
                """
                }
        }
        stage('Test Backend'){
            steps{
                //eventually ill have a way to test
                echo 'testing backend...'
            }
        }
        stage('Push to Staging'){
            when {
                not {branch 'staging'}
                not {branch 'production'}
                not {branch 'master'}
                not {tag 'release-v*'}
            }
            steps{
                withCredentials([usernamePassword(credentialsId: 'Github-User-Token', passwordVariable: 'GIT_PASSWORD', usernameVariable: 'GIT_USERNAME')]) {
                    sh """
                        git push https://${GIT_USERNAME}:${GIT_PASSWORD}@github.com/samikool/OneRoomDnd.git HEAD:staging
                    """
                }
            }
        }
        stage('Deploy Frontend to Staging'){
            when {
                branch 'staging'
            }
            steps{
               sh  """
                    npm run build:staging --prefix frontend
                    sudo rm -rf /srv/http/oneRoomDnd/staging/*
                    sudo cp frontend/build/* -rf /srv/http/oneRoomDnd/staging/
                    sudo echo "frontend deployed..."
                """
            }
        }
        stage('Deploy Backend to Staging'){
            when {
                branch 'staging'
            }
            steps{
               sh  """
                    sudo npm run stop:staging --prefix /backends/oneRoomDnd/staging

                    sudo rm -rf /backends/oneRoomDnd/staging/*
                    sudo cp backend/*.js backend/package.json backend/routes backend/data /backends/oneRoomDnd/staging/ -rf
                    sudo cp /backends/oneRoomDnd/env/.env /backends/oneRoomDnd/staging/
                    sudo npm --prefix /backends/oneRoomDnd/staging/ install
                    
                    sudo npm run deploy:staging --prefix /backends/oneRoomDnd/staging
                """
            }
        }
        stage('Deploy Frontend to Production'){
            when { 
                tag 'release-v*'
            }
            steps {
                sh  """
                    npm run build --prefix frontend
                    sudo rm -rf /srv/http/oneRoomDnd/production/*
                    sudo cp frontend/build/* -rf /srv/http/oneRoomDnd/production/
                    sudo echo "frontend deployed..."
                """
            }
        }
        stage('Deploy Backend to Production'){
            when {
                tag 'release-v*'
            }
            steps {
                sh  """
                    sudo npm run stop --prefix /backends/oneRoomDnd/production

                    sudo rm -rf /backends/oneRoomDnd/production/*
                    sudo cp backend/*.js backend/package.json backend/routes /backends/oneRoomDnd/production/ -rf
                    sudo cp /backends/oneRoomDnd/env/.env /backends/oneRoomDnd/production/
                    sudo npm install --prefix /backends/oneRoomDnd/production/ 
                    
                    sudo npm run deploy:production --prefix /backends/oneRoomDnd/production
                """
            }
        }
    }
}