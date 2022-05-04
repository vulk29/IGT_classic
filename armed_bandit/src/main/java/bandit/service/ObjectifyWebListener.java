package bandit.service;



import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import com.googlecode.objectify.ObjectifyFactory;
import com.googlecode.objectify.ObjectifyService;

import bandit.ArmedBandit;
import bandit.Profile;

import com.google.appengine.repackaged.com.google.datastore.v1.client.DatastoreOptions;

@WebListener
public class ObjectifyWebListener implements ServletContextListener {

  @Override
  public void contextInitialized(ServletContextEvent event) {
    ObjectifyService.init(/*new ObjectifyFactory(
    	    DatastoreOptions.newBuilder()
            .setHost("http://localhost:8484")
            .setProjectId("collectiveps")
            .build()
            .getService()
    )*/);
    // This is a good place to register your POJO entity classes.
    ObjectifyService.register(Profile.class);
    ObjectifyService.register(ArmedBandit.class);
  
  }

  @Override
  public void contextDestroyed(ServletContextEvent event) {
  }
  
}
