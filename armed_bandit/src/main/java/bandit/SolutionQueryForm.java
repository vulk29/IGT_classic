package bandit;


import static bandit.service.OfyService.ofy;

import com.google.api.server.spi.config.AnnotationBoolean;
import com.google.api.server.spi.config.ApiResourceProperty;
import com.google.common.collect.ImmutableList;
import com.googlecode.objectify.cmd.Query;

import java.util.ArrayList;
import java.util.List;
import java.util.logging.Logger;
public class SolutionQueryForm {
	
	
	private static final Logger LOG = Logger.getLogger(SolutionQueryForm.class.getName());
	
	public static enum FieldType {
        STRING, INTEGER
    }

    /**
     * Enum representing a field.
     */
    public static enum Field {
    	 CREATED("organizerUserId", FieldType.STRING),
         FITNESS("fitness", FieldType.INTEGER),
         SOLUTION("solution", FieldType.STRING),
         ORDER("order", FieldType.INTEGER), 
         MINE("mine", FieldType.INTEGER),
        ;
        private String fieldName;

        private FieldType fieldType;

        private Field(String fieldName, FieldType fieldType) {
            this.fieldName = fieldName;
            this.fieldType = fieldType;
        }

        private String getFieldName() {
            return this.fieldName;
        }
    }

    /**
     * Enum representing an operator.
     */
    public static enum Operator {
        EQ("=="),
        LT("<"),
        GT(">"),
        LTEQ("<="),
        GTEQ(">="),
        NE("!=");

        private String queryOperator;

        private Operator(String queryOperator) {
            this.queryOperator = queryOperator;
        }

        private String getQueryOperator() {
            return this.queryOperator;
        }

        private boolean isInequalityFilter() {
            return this.queryOperator.contains("<") || this.queryOperator.contains(">") ||
                    this.queryOperator.contains("!");
        }
    }

    public class OperatorTest
    {
    	public Operator operator;

		public OperatorTest(Operator operator)
    	{
    		this.operator=operator;
    	}
    }
    
    
    
    public class FieldTest
    {
    	public Field field;
    	public FieldType fieldType; 

		public FieldTest(Field field)
    	{
    		this.field=field;
    		this.fieldType=field.fieldType;
    	}
    }

    /**
     * A class representing a single filter for the query.
     */
    public static class Filter {
        private Field field;
        private Operator operator;
        private String value;

        public Filter () {}
        
        public Filter (FieldTest fieldTest, OperatorTest operatorTest, String string) {
        	this.field=fieldTest.field;
        	this.operator=operatorTest.operator;
        	this.value=string;
        	
        }

        public Filter(Field field, Operator operator, String value) {
            this.field = field;
            this.operator = operator;
            this.value = value;
        }

        public Field getField() {
            return field;
        }

        public Operator getOperator() {
            return operator;
        }

        public String getValue() {
            return value;
        }
    }

    public Query<ArmedBandit> getQueryforFitness(String solution) {
        // First check the feasibility of inequality filters.
        checkFilters();
        Query<ArmedBandit> query = ofy().load().type(ArmedBandit.class);
        if (inequalityFilter == null) {
            // Order by name.
            query = query.order("order");
        } else {
            // If we have any inequality filters, order by the field first.
         //   query = query.order(inequalityFilter.field.getFieldName());
           // query = query.order("order");
        }
        
        filters.add(new Filter(new FieldTest(Field.SOLUTION), new OperatorTest(Operator.EQ), solution));
          for (Filter filter : this.filters) {
            // Applies filters in order.
            if (filter.field.fieldType == FieldType.STRING) {
                query = query.filter(String.format("%s %s", filter.field.getFieldName(),
                        filter.operator.getQueryOperator()), filter.value);
            } else if (filter.field.fieldType == FieldType.INTEGER) {
                query = query.filter(String.format("%s %s", filter.field.getFieldName(),
                        filter.operator.getQueryOperator()), Integer.parseInt(filter.value));
            }
        }
        LOG.info(query.toString());
        return query;
    }
    
    /**
     * A list of query filters.
     */
    private List<Filter> filters = new ArrayList<>(0);

    /**
     * Holds the first inequalityFilter for checking the feasibility of the whole query.
     */
    @ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
    private Filter inequalityFilter;

    public SolutionQueryForm() {}

    /**
     * Checks the feasibility of the whole query.
     */
    private void checkFilters() {
        for (Filter filter : this.filters) {
            if (filter.operator.isInequalityFilter()) {
                // Only one inequality filter is allowed.
                if (inequalityFilter != null && !inequalityFilter.field.equals(filter.field)) {
                    throw new IllegalArgumentException(
                            "Inequality filter is allowed on only one field.");
                }
                inequalityFilter = filter;
            }
        }
    }

    /**
     * Getter for filters.
     *
     * @return The List of filters.
     */
    public List<Filter> getFilters() {
        return filters;
    }

    /**
     * Adds a query filter.
     *
     * @param filter A Filter object for the query.
     * @return this for method chaining.
     */
    public SolutionQueryForm filter(Filter filter) {
        if (filter.operator.isInequalityFilter()) {
            // Only allows inequality filters on a single field.
            if (inequalityFilter != null && !inequalityFilter.field.equals(filter.field)) {
                throw new IllegalArgumentException(
                        "Inequality filter is allowed on only one field.");
            }
            inequalityFilter = filter;
        }
        filters.add(filter);
        return this;
    }

    /**
     * Returns an Objectify Query object for the specified filters.
     *
     * @return an Objectify Query.
     */
    @ApiResourceProperty(ignored = AnnotationBoolean.TRUE)
    public Query<ArmedBandit> getQuery(String p) {
        // First check the feasibility of inequality filters.
        checkFilters();
        Query<ArmedBandit> query = ofy().load().type(ArmedBandit.class);
        if (inequalityFilter == null) {
            // Order by name.
            query = query.order("order");
        } else {
            // If we have any inequality filters, order by the field first.
         //   query = query.order(inequalityFilter.field.getFieldName());
           // query = query.order("order");
        }
        
        filters.add(new Filter(new FieldTest(Field.MINE), new OperatorTest(Operator.EQ), "1"));
        filters.add(new Filter(new FieldTest(Field.ORDER), new OperatorTest(Operator.GTEQ), p));
     
        for (Filter filter : this.filters) {
            // Applies filters in order.
            if (filter.field.fieldType == FieldType.STRING) {
                query = query.filter(String.format("%s %s", filter.field.getFieldName(),
                        filter.operator.getQueryOperator()), filter.value);
            } else if (filter.field.fieldType == FieldType.INTEGER) {
                query = query.filter(String.format("%s %s", filter.field.getFieldName(),
                        filter.operator.getQueryOperator()), Integer.parseInt(filter.value));
            }
        }
        LOG.info(query.toString());
        return query;
    }
}
