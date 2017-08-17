FROM mflo999/pi-run

# install the app
COPY dist.tar.gz /tmp/dist.tar.gz
RUN mkdir /angular-lib
RUN tar -zxf /tmp/dist.tar.gz -C /angular-lib

# start the app
WORKDIR /angular-lib
ENTRYPOINT ["/bin/bash", "./server.sh"]
