FROM python:3

# Set environment variables
ENV PYTHONUNBUFFERED 1

# Set work directory.
RUN mkdir /website

WORKDIR /website

COPY requirements.txt /website/

# Install dependencies.
RUN pip install -r requirements.txt

# Copy project website.
COPY . /website/

EXPOSE 8080