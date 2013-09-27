 

<html>
<head>
<style>
.left{
	width:90%;

}
.right
{
	width:30%;
	height:300px;
	float:right;
	font: 10px verdana;
}
.result{
font: 12px arial;
width:100%
background: lightgoldenrodyellow;


}
.input{
height: 300px;
width: 100%;
font: 20px verdana;
}
.submit{
text-align: center;
    width: 300px;
    height: 50px;
    color: white;
    background: green;
    font-size: 40px;
    border-radius: 15px;
}
</style>

</head>
    <body>
<div class="left">
        <form method="post" action="<?php echo $_SERVER['PHP_SELF'] ?>" >
        <textarea name="run" class="input"> <?php echo isset($_POST['run']) ?  $_POST['run'] :''; ?> </textarea><br/>
      <p style="text-align:center"> <input type="submit" class="submit" name="submit" value="Go" ></p>
        </form>

</div>


    </body>
    
    
</html>

<div>Result:<hr/> </div>
<div class="result" >
<?php

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

if(isset($_POST['submit'])){
    $str  =  $_POST['run'];
   
    echo eval($str);
    
}

 
?>
</div>