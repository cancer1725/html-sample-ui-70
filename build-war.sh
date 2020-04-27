#!/bin/sh
# Copyright (c) 2019 VMware, Inc. All rights reserved.
# Mac OS script
# Note: if Ant runs out of memory try defining ANT_OPTS=-Xmx512M

if [ -z "$ANT_HOME" ] || [ ! -f "${ANT_HOME}"/bin/ant ]
then
   echo BUILD FAILED: You must set the environment variable ANT_HOME to your Apache Ant folder
   exit 1
fi

"${ANT_HOME}"/bin/ant build-plugin-war

exit 0
