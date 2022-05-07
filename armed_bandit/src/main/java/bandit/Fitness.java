package bandit;
import java.util.Random;

public class Fitness {
	
	
	public static int[] fitness1=ArmedBandit.fitness1;
	public static int[] fitness2=ArmedBandit.fitness2;
	public static int[] fitness3=ArmedBandit.fitness3;
	public static int[] fitness4=ArmedBandit.fitness4;

	public static int[] evaluate(int arm, int order, int arm_logic) 
    {
	
int [] fitness= new int [2];	
if (order>40)
	order=order-40;
if (order>40)
	order=order-40;
arm=remap_arms(arm, arm_logic);

if (arm==1)
{
fitness[0]=100;
fitness[1]=fitness1[order];
}
if (arm==2)
{
fitness[0]=100;
fitness[1]=fitness2[order];
}

if (arm==3)
	{fitness[0]=50;
	fitness[1]=fitness3[order];
	}
	
if (arm==4)
{
	fitness[0]=50;
	fitness[1]=fitness4[order];
	}

return fitness; 
    }

	private static int remap_arms(int arm, int arm_logic) {
		// TODO Auto-generated method stub
		int arm2=0;
		if (arm_logic==0)
		{
			if (arm==1)
				arm2=2;
			if (arm==2)
				arm2=3;
			if (arm==3)
				arm2=4;
			if (arm==4)
				arm2=1;
		}
		if (arm_logic==1)
		{
			if (arm==1)
				arm2=3;
			if (arm==2)
				arm2=4;
			if (arm==3)
				arm2=2;
			if (arm==4)
				arm2=1;
		}
		
		if (arm_logic==2)
		{
			if (arm==1)
				arm2=4;
			if (arm==2)
				arm2=1;
			if (arm==3)
				arm2=3;
			if (arm==4)
				arm2=2;
		}
		
		if (arm_logic==3)
		{
			if (arm==1)
				arm2=1;
			if (arm==2)
				arm2=2;
			if (arm==3)
				arm2=3;
			if (arm==4)
				arm2=4;
		}
		
		return arm2;
	}
    	
	
}
