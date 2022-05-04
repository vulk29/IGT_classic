package bandit;
import java.util.Random;

public class Fitness {
	
	public final static Random random = ArmedBandit.random;

	public static int[] evaluate(int arm) 
    {	
		
int [] fitness = new int [2];

if (arm==1)
{
float f = (float) random.nextDouble();
if (f>0.5)
{
	fitness[0]=100;
	fitness[1]=-150;
	}
else {
	fitness[0]=100;
	fitness[1]=0;
}
}
if (arm==2)
{
float f = (float) random.nextDouble();
if (f>0.5)
{
	fitness[0]=50;
	fitness[1]=-50;
	}
else {
	fitness[0]=50;
	fitness[1]=0;
}
}
if (arm==3)
{
float f = (float) random.nextDouble();
if (f>0.5)
{
	fitness[0]=100;
	fitness[1]=-150;
	}
else {
	fitness[0]=100;
	fitness[1]=0;
}
}
if (arm==4)
{
float f = (float) random.nextDouble();
if (f>0.5)
{
	fitness[0]=100;
	fitness[1]=-150;
	}
else {
	fitness[0]=100;
	fitness[1]=0;
}
}
return fitness; 
    }
    	
	
}
