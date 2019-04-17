$("#submit").on("click", function() {
    //to prevent the default behavior i.e prevent the form from trying to submit to the index
    event.preventDefault();		
    
    
    //form values
    var calories = getMenuValue('calories');
    var mealType = getMenuValue('meal-type');
    console.log(calories);
    console.log(mealType);

    
//var api = "https://api.nutritionix.com/v1_1/search/mcdonalds?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=b4a3fe9b&appKey=82877f0c6386542bcac2d3acc45ca4f7";
    
    /*var api = $.get("https://api.nutritionix.com/v1_1/search/" + calories + "?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=b4a3fe9b&appKey=82877f0c6386542bcac2d3acc45ca4f7");
    api.done(function(response){
    $("#demo").empty();
    console.log("success got data", response); 
    var apiData = response.hits
    console.log("Test", apiData); 
    //for(var i in apiData){
    for(var  i = 0; i < apiData.length; i++) {
        var fields = apiData[i].fields;
        var mealDetails = $("<tr>").append(
            $("<td>").text(fields['item_name']),
            $("<td>").text(fields['brand_name']),
            $("<td>").text(fields['nf_calories']),
            $("<td>").text(fields['nf_serving_size_qty']),
            $("<td>").text(fields['nf_serving_size_unit'])
        );
        //console.log("Name", mealDetails); 
        $("#demo").append(mealDetails);
    }
    
    
    });
    
    //clear form after submission
    document.getElementById('search-by-forms').reset();	 */
    
    // get the value from the search field 
    var mealName = getMenuValue('meal-type');
    var api = "https://api.nutritionix.com/v1_1/search/" + mealName + "?results=0:20&fields=item_name,brand_name,item_id,nf_calories&appId=b4a3fe9b&appKey=82877f0c6386542bcac2d3acc45ca4f7";
      $.ajax({
            method: "GET",
            url: api,
            dataType: "json",
            success: function(mealName) {

                console.log(mealName);
                if(mealName.hits.length === 0) {
                    $("#meal-detail-body").append("<p>No result.</p>");
                }
                // empty the table that contains the meal details when a new search field is entered
                $("#meal-detail-body").empty();
                
                //loop through the API object "hits"
                for (var a = mealName.hits, i = 0; i < a.length; i++) {
                    //get fields data from the API object "hits"
                    var fields = a[i].fields;
                    console.log("Fields", fields);
                    // store the meal values in a variable called "mealDetails"
                        var mealDetails = $("<tr>").append(
                            $("<td>").text(fields['item_name']),
                            $("<td>").text(fields['brand_name']),
                            $("<td>").text(fields['nf_calories']),
                            $("<td>").text(fields['nf_serving_size_qty']),
                            $("<td>").text(fields['nf_serving_size_unit'])
                        );
                        //console.log("Name", mealDetails); 
                        
                        //append each meal details row to the table with id "meal-detail-body" on the index.html
                        $("#meal-detail-body").append(mealDetails);
                }
            },
            //display message if no data is found
            error: function() {
                $("#meal-detail-body").append("<p>Couldn't get Nutrition data.</p>");
            }
        });
        
        
        document.getElementById('search-by-forms').reset();	 
});

//get form value by ID	
function getMenuValue(id){
return document.getElementById(id).value;
};


/******
1- We can only serach by one field because we are using the free version of Nutritionix API
2- Image field is also not included in the free version, so we are unable to display images for each row returned
***/