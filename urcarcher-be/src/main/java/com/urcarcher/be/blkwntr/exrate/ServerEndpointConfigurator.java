package com.urcarcher.be.blkwntr.exrate;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.BeanFactory;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.context.annotation.Configuration;

import jakarta.websocket.server.ServerEndpointConfig.Configurator;

@Configuration
public class ServerEndpointConfigurator extends Configurator implements ApplicationContextAware {
	private static volatile BeanFactory context;

	@Override
    public <T> T getEndpointInstance(Class<T> clazz) throws InstantiationException {
        return context.getBean(clazz);
    }
	
	@Override
	public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
		ServerEndpointConfigurator.context = applicationContext;
	}

}
