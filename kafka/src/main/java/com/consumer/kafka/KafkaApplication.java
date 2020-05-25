package com.consumer.kafka;

import org.apache.http.HttpHost;
import org.apache.kafka.clients.consumer.*;
import org.apache.kafka.common.TopicPartition;
import org.elasticsearch.client.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.text.SimpleDateFormat;
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

				Map<String, String> map = new HashMap<String, String>();

				for (ConsumerRecord<String, String> record : records) {
					map.put(record.key(), record.value());
					log.info("offset = " + record.offset()
							+ "\tkey =" + record.key()
							+ "\tvalue =" + record.value());

					consumer.commitAsync(new OffsetCommitCallback() {
						@Override
						public void onComplete(Map<TopicPartition, OffsetAndMetadata> offsets, Exception exception) {
						}
					});

					RestClient restClient = RestClient.builder(
							new HttpHost("49.50.172.175", 9200, "http"),
							new HttpHost("49.50.172.175", 9201, "http")).build();

					Request request = new Request("POST", "/influencer/click-log");

					SimpleDateFormat transFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
					String date = transFormat.format(new Date());

					request.setJsonEntity("{\"updateDate\":\"" + date + "\","
							+ "\"item\":\"" + map.get("item") + "\","
							+ "\"userName\":\"" + map.get("userName") + "\","
							+ "\"id\":\"" + map.get("_id") + "\"}");

					Cancellable cancellable = restClient.performRequestAsync(
							request,
							new ResponseListener() {
								@Override
								public void onSuccess(Response response) {
									System.out.println(response.toString());
								}

								@Override
								public void onFailure(Exception exception) {
									exception.printStackTrace();
								}
							});
				}
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
