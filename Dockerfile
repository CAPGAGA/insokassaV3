FROM python:3.9-slim

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1


RUN apt-get update -y && apt -y upgrade && \
    apt-get install -y python-dev python3-pip build-essential python-setuptools

COPY . /app/insokassaV3

ADD etc etc

WORKDIR /app/insokassaV3

COPY entrypoint.sh /entrypoint.sh

RUN chmod a+x /entrypoint.sh

RUN python -m venv /opt/insokassaV3_venv
ENV PATH="/opt/venv/bin:$PATH"

RUN pip3 install -r requirements.txt


ENTRYPOINT ["/app/insokassaV3/entrypoint.sh"]