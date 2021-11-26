FROM python:3

# Set environment variables
ENV PYTHONUNBUFFERED 1

COPY requirements.txt /

# Install dependencies.
RUN pip install -r /requirements.txt

# Set work directory.
RUN mkdir /website
WORKDIR /website

# Copy project website.
COPY . /website/

EXPOSE 8080