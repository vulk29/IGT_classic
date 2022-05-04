package bandit;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

/**
 * A simple Java object (POJO) representing a Solution form sent from the client.
 */
public class SolutionForm implements Serializable{
    /**
     * The name of the conference.
     */
	public final static int PROBLEM_SIZE = 3;
	public final int modules = 2;
	public final int bias =1;
	public final int levels=3;
	
    public String solution;
    
    public int [] fitness;

    private String description;

    
    public String organizerUserId;
    
	public int[] genes;
	public int bet;


   private SolutionForm() {}

    /**
     * Public constructor is solely for Unit Test.
     */
    public SolutionForm(String solutio, String description) {
        this.solution = solutio;
        this.genes = convert(solutio);
        this.description = description;
        this.bet=extract(solutio);
       
     }

    private int extract(String sol) {
    	int [] genez = new int [PROBLEM_SIZE+1];
    	
        int[] newGuess = new int[sol.length()];
        for (int ii = 0; ii < sol.length(); ii++)
        {
            newGuess[ii] = sol.charAt(ii) - '0';
        }
        
		return newGuess[sol.length()];
	}

	public void update (String name)
    {
    	this.organizerUserId=name;
    	
    }
    
    public static int [] convert (String sol)
    {	int [] genez = new int [PROBLEM_SIZE];
    	
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
    
    	return genez;
    }

    
    public String getSolution() {
        return solution;
    }
    
    public int [] getFitness(int arm) {
        return  Fitness.evaluate(arm);
    }
    
    public String getId() {
        return organizerUserId;
    }

    public String getDescription() {
        return description;
    }

	public int[] getGenez() {
		// TODO Auto-generated method stub
		return genes;
	}

	public int getBet() {
		// TODO Auto-generated method stub
		return bet;
	}

   
}
