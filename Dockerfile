FROM catthehacker/ubuntu:runner-latest

SHELL [ "/bin/bash", "-c" ]

RUN sudo apt-get update \
  && sudo apt-get install -y \
  xvfb \
  libnss3 \
  libgtk-3-0 \
  libgbm1 \
  libasound2 \
  default-jre

# install pipenv
USER runneradmin
ADD --chown=runneradmin https://raw.githubusercontent.com/pypa/pipenv/master/get-pipenv.py /tmp/
RUN python /tmp/get-pipenv.py \
  && rm /tmp/get-pipenv.py
