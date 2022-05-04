package bandit;


import static bandit.service.OfyService.ofy;

import com.googlecode.objectify.condition.IfNotDefault;
import com.google.api.server.spi.config.AnnotationBoolean;
import com.google.api.server.spi.config.ApiResourceProperty;
import com.google.common.base.Preconditions;

import com.googlecode.objectify.Key;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;
import com.googlecode.objectify.annotation.Parent;

import java.io.Serializable;
import java.nio.ByteBuffer;
import java.nio.IntBuffer;
import java.util.Arrays;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Random;

/**
 * Armed Bandit class stores Armed Bandit information.
 */
@Entity
public class ArmedBandit implements Serializable{

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;


	static final int PROBLEM_SIZE = 4;


	public static Random random=new Random(System.currentTimeMillis());

	
	/**
     * The id for the datastore key.
     *
     * We use automatic id assignment for entities of ArmedBandit class.
     */
    @Id
    private long id;


    @Index
    public String solution;
    
   
    @Index
    public int order =0;
    
    @Index
    public long time=0;
    
    @Index
    public int bet=0;
    
    

   
    /**
     * The description of the solution - it might be not necessary in this implementation, but one usually wants the string AND the vector.
     */
    private String description;

    @Index
    public int [] fitness;
  
    @Parent
    @ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
    private Key<Profile> profileKey;

    /**
     * The userId of the organizer.
     */
    @Index
	public String organizerUserId;
    
    /**
     * this is a legacy variable name but i left it as such for convenience. it's just the user id, but depending on implementation, one might want both a 
     * user name (e.g. email) and a handle  
     */

    @Index
	public int likes = 0;

    @Index
	public int score;
	
    private static Profile getProfileFromUser(String userId) {
        // First fetch the user's Profile from the datastore.
        Profile profile = ofy().load().key(
                Key.create(Profile.class, userId)).now();
        if (profile == null) {
            // Create a new Profile if it doesn't exist.
            // Use default displayName and teeShirtSize
        
            profile = new Profile(userId, userId);
        }
        return profile;
    }

    

    /**
     * Just making the default constructor private.
     */
    private ArmedBandit() {}

    public ArmedBandit(final long id, final String organizerUserId,
                      final SolutionForm solutionForm, int count) {
        Preconditions.checkNotNull(solutionForm.getSolution(), "The solution is required");
        this.id = id;
        Profile profile = getProfileFromUser(organizerUserId);
        this.order=count;
        this.profileKey = Key.create(Profile.class, organizerUserId);
        this.organizerUserId = organizerUserId;
        this.bet=solutionForm.bet;
        updateWithConferenceForm(solutionForm);
        this.time=System.currentTimeMillis();
        this.score=profile.score+this.fitness[0]-this.fitness[1];
        
        


    }

    public ArmedBandit(final long id, final String organizerUserId,
            String solution, int count, final int [] fitness, int bet) {

this.id = id;
Profile profile = getProfileFromUser(organizerUserId);
this.order=profile.solscount;
this.profileKey = Key.create(Profile.class, organizerUserId);
this.organizerUserId = organizerUserId;
this.order=count;
this.solution=solution;
this.fitness=fitness;
this.bet=bet;
this.time=System.currentTimeMillis();

}
    
    public long getId() {
        return id;
    }

    public String getSolution() {
        return solution;
    }

    public String getDescription() {
        return description;
    }

    @ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
    public Key<Profile> getProfileKey() {
        return profileKey;
    }

    // Get a String version of the key
    public String getWebsafeKey() {
        return Key.create(profileKey, ArmedBandit.class, id).getString();
    }

    
    public String getOrganizerUserId() {
        return organizerUserId;
    }

    

    /**
     * Returns organizer's display name.
     *
     * @return organizer's display name. If there is no Profile, return his/her userId.
     */
    public String getOrganizerDisplayName() {
        // Profile organizer = ofy().load().key(Key.create(Profile.class, organizerUserId)).now();
        Profile organizer = ofy().load().key(getProfileKey()).now();
        if (organizer == null) {
            return organizerUserId;
        } else {
            return organizer.getDisplayName();
        }
    }


 
    /**
     * Updates the Conference with ConferenceForm.
     * This method is used upon object creation as well as updating existing Conferences.
     *
     * @param conferenceForm contains form data sent from the client.
     */
    public void updateWithConferenceForm(SolutionForm solutionForm) {
        this.solution = convert(solutionForm.getSolution());
        this.description = solutionForm.getDescription();
        this.fitness = solutionForm.getFitness(getARM(solutionForm.getSolution()));//fitness function to be added 
        this.bet=extract(solutionForm.getSolution());
    }
    



	public int extract(String sol) {
		// TODO Auto-generated method stub
		int [] genez = new int [PROBLEM_SIZE+1];
    	
        int[] newGuess = new int[sol.length()];
        for (int ii = 0; ii < sol.length(); ii++)
        {
            newGuess[ii] = sol.charAt(ii) - '0';
        }
        
		return newGuess[newGuess.length-1];
	}


	public static String convert (String sol)
    {	int [] genez = new int [PROBLEM_SIZE];
    	String so ="You pulled arm # ";
    
    int[] newGuess = new int[PROBLEM_SIZE*2];
    
    for (int ii = 0; ii < PROBLEM_SIZE*2; ii++)
    {
        newGuess[ii] = sol.charAt(ii) - '0';
    }
    
    int i=0; int j=0;
    while (i<PROBLEM_SIZE||j<PROBLEM_SIZE*2)
    {
    	genez[newGuess[j+1]-2] = newGuess[j];
    	i++;
    	j+=2;
    }
    
    for (int p=0; p<PROBLEM_SIZE; p++)
    {
    	if (genez[p]==0) so+="";
    	else so+=Integer.toString(p+1);
    }
    
    	return so;
    	
    }

	
	public static int getARM (String sol)
    {	int [] genez = new int [PROBLEM_SIZE];
    	int so =0;
    
    int[] newGuess = new int[PROBLEM_SIZE*2];
    
    for (int ii = 0; ii < PROBLEM_SIZE*2; ii++)
    {
        newGuess[ii] = sol.charAt(ii) - '0';
    }
    
    int i=0; int j=0;
    while (i<PROBLEM_SIZE||j<PROBLEM_SIZE*2)
    {
    	genez[newGuess[j+1]-2] = newGuess[j];
    	i++;
    	j+=2;
    }
    
    for (int p=0; p<PROBLEM_SIZE; p++)
    {
    	if (genez[p]==0) so=so+0;
    	else so=p+1;
    }
    
    	return so;
    	
    }

	
    
    public void solution_order(final int number) {
       this.likes  = likes + number;
    }

  
    @Override
    public String toString() {
        StringBuilder stringBuilder = new StringBuilder("Id: " + id + "\n")
                .append("Name: ").append(solution).append("\n");
            return stringBuilder.toString();
    }

}