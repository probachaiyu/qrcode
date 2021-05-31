FROM python:3.8.5

RUN apt-get update && apt-get install -y netcat
RUN apt-get install -y scrot && apt-get install -y python3-tk && apt-get install -y python3-dev
RUN apt-get update && apt-get -y install libzbar0

COPY requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

ADD . /usr/src/app
WORKDIR /usr/src/app
