$("#parent-div").hide();
$("#child-div").hide();

$("input[type='radio']").change(function(){

 

    let parent = $("input[id='checkbox-parent']:checked").val();
    console.log(parent);

    if (parent){
    $("#child-div").hide();
    $("#parent-div").show();
}






    let child = $("input[id='checkbox-child']:checked").val();
    console.log(child);

    if (child){
        $("#parent-div").hide();
        $("#child-div").show();
    }

})

