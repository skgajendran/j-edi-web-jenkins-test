#!groovy
/*
# Copyright 2017 Juniper Networks, Inc. All rights reserved.
# Licensed under the Juniper Networks Script Software License (the "License").
# You may not use this script file except in compliance with the License, which is located at
# http://www.juniper.net/support/legal/scriptlicense/
# Unless required by applicable law or otherwise agreed to in writing by the parties,
# software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND,
# either express or implied.
*/
def rev
node('docker') {
  
  // Put branch name into label
  def repo = 'j-edi-web'
  // For master, label with build number.  Otherwise, label with branch name.
  def label = ("$BRANCH_NAME" == 'master') ? "$repo:build$BUILD_NUMBER" : "$repo:$BRANCH_NAME"

  // Scope image outside of stage.
  def image

  stage('Build image') {
    sh 'printenv'
    checkout scm
    image = docker.build("$label")
    echo "${image}"
  }

  stage('Test') {
    echo  "${label}: Trying to run container"
    sh "docker run -d --name ${label}"
    echo "Verifying that container is available"
    def command = "docker inspect -f {{.State.Running}} ${label}|grep true"
    sh(script: "${command}")
    echo "Deleting test container ${label}"
    sh "docker rm -f ${label}"
  }

  // stage('Push image') {
  //   // Push $label and update latest.
  //   docker.withRegistry('https://ps-docker-internal.artifactory.aslab.juniper.net', 'ps-ci') {
  //     image.push()
  //     if ("$BRANCH_NAME" == 'master') {
  //       image.push('latest')
  //     }
  //   }
  //   // Post publish notification to channel if configured.
  //   if (env.JEDI_WEBHOOK_URL) { 
  //     office365ConnectorSend message: "Image Published", status:"$label published ($BRANCH_NAME branch).", webhookUrl: env.JEDI_WEBHOOK_URL 
  //   }
  // }

}