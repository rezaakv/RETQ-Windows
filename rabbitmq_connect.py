#!/usr/bin/env python
# Unused file for now
import pika

credentials = pika.PlainCredentials('', '')
connection = pika.BlockingConnection(pika.ConnectionParameters('localhost', 5671, '/', credentials))
channel = connection.channel()

channel.queue_declare(queue='hello')
channel.basic_publish(exchange='',
                      routing_key='hello',
                      body='Hello World!')
print(" [x] Sent 'Hello World!'")
connection.close()