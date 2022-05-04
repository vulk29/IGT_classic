package bandit;


import static bandit.service.OfyService.factory;
import static bandit.service.OfyService.ofy;
import bandit.service.OfyService;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiMethod.HttpMethod;
import com.google.api.server.spi.config.Named;
import com.google.api.server.spi.response.ConflictException;
import com.google.api.server.spi.response.ForbiddenException;
import com.google.api.server.spi.response.NotFoundException;
import com.google.api.server.spi.response.UnauthorizedException;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.Objectify;
import com.googlecode.objectify.Work;
import com.googlecode.objectify.cmd.Query;

/**
 * Defines armed bandit APIs.
 */
@Api(name = "bandit", version = "v1", scopes = {Constants.EMAIL_SCOPE },
    clientIds = {
		Constants.WEB_CLIENT_ID,
		Constants.API_EXPLORER_CLIENT_ID },
    description = "API for the armed bandit Backend application.")

public class BanditApi {

	
	@ApiMethod(name = "getProfile", path = "profile", httpMethod = HttpMethod.GET)
	public Profile getProfile(@Named ("userId") String userId) throws UnauthorizedException {
		if (userId == null) {
			throw new UnauthorizedException("Authorization required");
		}

		// TODO
		// TODO load the Profile entity
		Key key = Key.create(Profile.class, userId);
		Profile profile = (Profile) ofy().load().key(key).now();
		return profile;
	}
	
	private static Profile getProfileFromUser(String userId) {
        // First fetch the user's Profile from the datastore.
        Profile profile = ofy().cache(false).load().key(
                Key.create(Profile.class, userId)).now();
        if (profile == null) {
            // Create a new Profile if it doesn't exist.
            // Use default displayName and teeShirtSize
        
            profile = new Profile(userId, userId);
        }
        return profile;
    }
	
	
	@ApiMethod(name = "saveProfile", path = "profile", httpMethod = HttpMethod.POST)
	
	// The request that invokes this method should provide data that
	// conforms to the fields defined in ProfileForm

	// TODO 1 Pass the ProfileForm parameter
	// TODO 2 Pass the User parameter
	public Profile saveProfile(ProfileForm profileForm)
			throws UnauthorizedException {

		String userId = profileForm.getDisplayName();
		String  displayName= profileForm.getDisplayName();
		
		if (userId == null) {
            throw new UnauthorizedException("Authorization required");
        }

		if (getProfile(userId)!=null) throw new UnauthorizedException("Username already exists. Please select a new one");

        Profile profile = new Profile(userId, displayName);

		// TODO 3 (In lesson 3)
		// Save the entity in the datastore

		// Return the profile
        
	       ofy().save().entity(profile).now();
		return profile;
	}
	
	@ApiMethod(name = "getsolutions", path = "solution", httpMethod = HttpMethod.GET)
	public List<ArmedBandit> getSolutions(@Named ("solution") String solution) {
	
		SolutionQueryForm solutionQueryForm = new SolutionQueryForm();
	
		return 	solutionQueryForm.getQueryforFitness(solution).list();
	}
	@ApiMethod(name = "createsolutions", path = "solution", httpMethod = HttpMethod.POST)
    public ArmedBandit createBanditSol(final SolutionForm solutionForm)
        throws Exception {
	 	String userId=solutionForm.getId();
	 	solutionForm.bet=solutionForm.getBet();
	 
	 
        if (userId == null) {
            throw new UnauthorizedException("please log in");
        }
        
        if (solutionForm.solution.length()<ArmedBandit.PROBLEM_SIZE)  throw new UnauthorizedException("something bad happened. Error in API, line 111");
        int s = Integer.parseInt(solutionForm.solution);
        if (s<20304)  throw new UnauthorizedException("please choose a lever");
    	final Key<Profile> profileKey = Key.create(Profile.class, userId);

        final Key<ArmedBandit> solutionKey = factory().allocateId(profileKey,ArmedBandit.class);
        final long conferenceId = solutionKey.getId();
        Profile profile = getProfile(userId);

        if (getSolutions(ArmedBandit.convert(solutionForm.solution)).isEmpty())
        {
        	
        ArmedBandit bandit = new ArmedBandit(conferenceId, profile.getUserId(), solutionForm, ofy().load().type(ArmedBandit.class)
                .ancestor(Key.create(Profile.class, profile.getDisplayName()))
                .order("likes").list().size());
        
        ofy().save().entities(bandit).now();
        profile.update_score(bandit.fitness);
        profile.update_bet(bandit.bet, bandit.order);
        ofy().clear();

        profile.addToSolutionKeys(solutionKey.toString(), bandit.order);
        bandit.solution_order(1);
        ofy().save().entities(profile, bandit).now();
        ofy().clear();
        return bandit;}
        else{ 
        	int [] fit = getSolutions(ArmedBandit.convert(solutionForm.solution)).get(0).fitness;
        	 ArmedBandit bandit = new ArmedBandit(conferenceId, profile.getUserId(), solutionForm, ofy().load().type(ArmedBandit.class)
                     .ancestor(Key.create(Profile.class, profile.getDisplayName()))
                     .order("likes").list().size());
       /* comment out alternative constructor because for armed bandits we dont want the same fitness for the same sol
        *    	 ArmedBandit bandit = new ArmedBandit(conferenceId, profile.getUserId(), ArmedBandit.convert(solutionForm.solution), ofy().load().type(ArmedBandit.class)
                     .ancestor(Key.create(Profile.class, profile.getDisplayName()))
                     .order("likes").list().size(), fit);
      */  	 
        	 ofy().save().entities(bandit).now();
        	 profile.update_score(bandit.fitness);
             profile.update_bet(bandit.bet, bandit.order);
             ofy().clear();

             profile.addToSolutionKeys(solutionKey.toString(), bandit.order);
             bandit.solution_order(1);
             ofy().save().entities(profile, bandit).now();
             ofy().clear();        	 
        	return bandit;
        }
        
	
	}
	 @ApiMethod(
	            name = "getSolutionsSubmitted",
	            path = "getSolutionsSubmitted",
	            httpMethod = HttpMethod.GET
	    )
	    public Collection<ArmedBandit> getSolutionsSubmitted(@Named ("user") String user)
	            throws UnauthorizedException, NotFoundException {
	        // If not signed in, throw a 401 error.
	        if (user == null) {
	            throw new UnauthorizedException("Authorization required");
	        }
	        Profile profile = ofy().load().key(Key.create(Profile.class, user)).now();
	        if (profile == null) {
	            throw new NotFoundException("Profile doesn't exist.");
	        }
	        List<String> keyStringsToAttend = profile.getKeysSolutionsSubmitted();
     
	        List<Key<ArmedBandit>> keysToAttend = new ArrayList<>();
	        for (String keyString : keyStringsToAttend) {
	            keysToAttend.add(Key.<ArmedBandit>create(keyString));
	        }
	        return ofy().load().keys(keysToAttend).values();
	    }


	    @ApiMethod(
	            name = "getSolutionsCreated",
	            path = "getSolutionsCreated",
	            httpMethod = HttpMethod.POST
	    )
	    public Profile getSolutionssCreated(@Named ("user") String user) throws UnauthorizedException {
	        // If not signed in, throw a 401 error.
	        if (user == null) {
	            throw new UnauthorizedException("Authorization required");
	        }
	        String organizerUserId = user;
	        Profile profile = getProfile(user);
	        
	        return profile;
	    }
	    
	    @ApiMethod(
	            name = "getBetsCreated",
	            path = "getBetsCreated",
	            httpMethod = HttpMethod.POST
	    )
	    public List<ArmedBandit> getBetsCreated(@Named ("user") String user) throws UnauthorizedException {
	        // If not signed in, throw a 401 error.
	        if (user == null) {
	            throw new UnauthorizedException("Authorization required");
	        }
	        String organizerUserId = user;
	        return ofy().load().type(ArmedBandit.class)
	                .ancestor(Key.create(Profile.class, organizerUserId))
	                .order("order").list();
	        
	    }
	 
	 
}
