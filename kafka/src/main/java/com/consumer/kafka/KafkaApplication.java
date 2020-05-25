package com.consumer.kafka;

import org.apache.kafka.clients.consumer.*;
import org.apache.kafka.common.TopicPartition;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import java.util.*;

@SpringBootApplication
public class KafkaApplication {

	private static final Logger log = LoggerFactory.getLogger(KafkaApplication.class);

	public static void main(String[] args) throws Exception{
		SpringApplication.run(KafkaApplication.class, args);
		subscribe();
	}

	private static Properties setConsumerProperty() {
		Properties configs = new Properties();

		configs.put("bootstrap.servers", "http://49.50.166.62:9092");
		configs.put("group.id", "click_log_group");
		configs.put("key.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
		configs.put("value.deserializer", "org.apache.kafka.common.serialization.StringDeserializer");
		configs.put("enable.auto.commit", "true");
		configs.put("auto.commit.interval.ms", "1000");
		configs.put("session.timeout.ms", "30000");

		return configs;
	}

	public static void subscribe() throws Exception {
		List<String> topicList = new ArrayList<>();
		topicList.add("click_log");

		KafkaConsumer<String, String> consumer = new KafkaConsumer<String, String>(setConsumerProperty());
		consumer.subscribe(topicList);

		try {
			while (true) {
				ConsumerRecords<String, String> records = consumer.poll(500);

				String url = "49.50.172.175:9200/click-log";
				Map<String, String> body = new HashMap<String, String>();

				for (ConsumerRecord<String, String> record : records) {
					body.put(record.key(), record.value());
					log.info("offset = " + record.offset()
							+ "\tkey =" + record.key()
							+ "\tvalue =" + record.value());

					consumer.commitAsync(new OffsetCommitCallback() {
						@Override
						public void onComplete(Map<TopicPartition, OffsetAndMetadata> offsets, Exception exception) {
						}
					});
				}

				RestTemplate restTemplate = new RestTemplate();
				ResponseEntity<Void> response = restTemplate.postForEntity(url, body, Void.class);

				if (response.getStatusCode() == HttpStatus.OK) System.out.println("Request Successful");
				else System.out.println("Request Failed");
			}

		} catch (Exception e) {
			e.printStackTrace();

		} finally {
			try {
				consumer.commitSync();
			} finally {
				consumer.close();
			}
		}
	}

}
