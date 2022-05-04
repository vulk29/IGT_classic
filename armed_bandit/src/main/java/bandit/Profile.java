package bandit;


import java.util.ArrayList;
import java.util.List;

import com.google.appengine.repackaged.com.google.common.collect.ImmutableList;
import com.googlecode.objectify.annotation.Entity;
import com.googlecode.objectify.annotation.Id;
import com.googlecode.objectify.annotation.Index;

@Entity
// TODO indicate that this class is an Entity
public class Profile {
	String displayName;
	
	// TODO indicate that the userId is to be used in the Entity's key
	@Id
	String userId;
	
	public List<String> solutionKeys = new ArrayList<>(0);
	
	@Index
	public int solscount=0;
	

	public int max=0;
	public double maxnk=0;
    

	/**
     * Public constructor for Profile.
     * @param userId The user id, obtained from the email
     * @param displayName Any string user wants us to display him/her on this system.
     * @param mainEmail User's main e-mail address.
     * @param teeShirtSize The User's tee shirt size
     * 
     */
    public Profile (String userId, String displayName) {
    	this.userId = userId;
    	this.displayName = displayName;
   
    }
    
	public String getDisplayName() {
		return displayName;
	}
	
	
	public String getUserId() {
		return userId;
	}
	
	public void updatesols()
	{
		this.solscount=this.getKeysSolutionsSubmitted().size();
		
	}
	
    public void addToSolutionKeys(String solutionKey, int pl) {
    	solutionKeys.add(solutionKey);
        this.solscount=pl;
        
    }
    
    public List<String> getKeysSolutionsSubmitted() {
        return ImmutableList.copyOf(solutionKeys);
    }


	/**
     * Just making the default constructor private.
     */
    private Profile() {}

	public void update_max(int fitness) {
		// TODO Auto-generated method stub
		this.max=fitness;
	}
	
	public void update_maxnk(int [] fitness) {
		// TODO Auto-generated method stub
		this.maxnk=fitness[0];
	}

	
}
