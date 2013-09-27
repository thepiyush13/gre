/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



         $(document).ready(function(){
         
                    $('#submit').click(function(){
                      calculate_score(); 
                   }) 
                   $('#save_score').click(function(){
                      var data  = calculate_score(); 
                      var url = '/Test/save_score.php';
                      ajax_call(url,data);
                  }) 
                   
                   $('#add_more').click(function(){
                       var htm = '<li class="options"><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; <input type="checkbox" >A&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" >B&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" >C&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" >D&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<input type="checkbox" >E&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;<input type="radio" class="status" value="Y">Correct <input type="radio" class="status" value="N">Incorrect </p></li>';
                       $('#q_list').append(htm);
                      

                   }) ;
				   $('#set_q').click(function(){
                       var step = $('#set_q_from').val();
					   $('#q_list').attr('start',step);
                      

                   }) ;
				   $('#count_q').click(function(){
                       var count = $('.options').length;
					   $('.count_q_no').text(count);
                      

                   }) ;
                   
                   $('#reload').click(function(){
                      var score = $('.percent').text() + $('.text_result').text();                      
                      $('.score_list').append('<li>'+score+'</li>');
                      $('input:checkbox').removeAttr('checked');
                      $('input:radio').removeAttr('checked');

                   }) 
                   
                   $('#start_timer').click(function(){
                      start_timer('start');
                   }) 
                   $('#stop_timer').click(function(){
                      start_timer('stop');
                   }) 
                   
                   $('#Start').click(function(){
                      start_timer('start');
                      var from = $('#countdown_from').val();
                      from = parseInt(from) * 60;
                      cd.countDown(from);
                   })
                   
                   //for prev next navigation
                           $("a.next").click(function(){
                            var $toHighlight = $('.active').next().length > 0 ? $('.active').next() : $('#div_q_list li').first();
                            $('.active').removeClass('active');
                            $toHighlight.addClass('active');
                        });

                        $("a.prev").click(function(){
                            var $toHighlight = $('.active').prev().length > 0 ? $('.active').prev() : $('#div_q_list li').last();
                            $('.active').removeClass('active');
                            $toHighlight.addClass('active');
                        });

 
        
    
        });  
  // for the count up stopwatch
          function start_timer(action){
              var counter = 0,
    timerOutput = document.getElementById('timerOutput');
    if(action=='start'){
        
        (function timer() {
    timerOutput.innerHTML = counter;
    counter += 1;
    if (counter >= 0) {
        t  = setTimeout(function () {
            timer();
        }, 1000);
    }
}());
    }else if(action=='stop'){
        clearTimeout(t);
    }

          }
   //for the countdown timer        
 cd = {
    countDown: function(start) {
        var that = this;
        if (start > 0) {
            setTimeout(function() {that.update(start)}, 1000);
        }
        else{
            alert('Time Over');
            start_timer('stop');
            disable_checkboxes();
        }
        
    },
    update: function(start) {
    start_text = start/60;
    document.getElementById('divtimerholder').innerHTML = start_text.toFixed(2);;
    start--;
    this.countDown(start);
    }
}
function calculate_score(){
    //start_timer('stop');
                       var correct  = 0;
                       var incorrect  = 0;
                       $('.options').each(function(){
                           var status  = $(this).find('.status:checked').attr('value');
                           if(status=='Y'){
                               correct++;
                           }
                           else if(status=='N'){
                               incorrect++;
                           }
                          
                       })
                       var total  =  parseInt($('.options').length);
                      var per =  Math.round((correct*100)/(total));
                      var na = total - (correct+incorrect);
                      var time = Math.round(parseInt($('#timerOutput').text()));  //in seconds
                      var attempted = correct+incorrect;
                      var speed = (time/(attempted*60)) ;   // mins per question
					  speed = parseFloat(speed).toFixed(2);
                      $('.percent').html('<span style="font-size: 30px;font-weight: bolder;"> '+per+'% </span>');
                      $('.text_result').html('<br/><span> Total:'+total+'    | Correct : '+correct+' |  Incorrect: '+incorrect+' |  NA: '+na+' |  Total Time : '+(time/60)+'Mins |  Speed: '+speed+' Mins/Q </span>');
                      
                      var type = $('#test_type option:selected').val();
                      var remark = $('#remark').val();
                      var data = { 'type':type,'per':per,'total':total,'correct':correct,'incorrect':incorrect,'na':na,'time':(time/60),'speed':speed,'remark':remark};
                      return data;
}


function disable_checkboxes(){
    $('input[type=checkbox]').attr('disabled','true');
}

function ajax_call(url,data){

   
    $.ajax({
        type: "POST",
        url: url,
        dataType: "json",
        data: data,
        timeout: 3000,
        beforeSend: function() {           
            $('.notify').text('Saving Data, Please Wait.......');
        },
        complete: function() {
            //$('.notify').text('Call Complete');
          
        },          
        cache: false,
        success: function(result) {
			console.log(result);
//            $('button.ajax-close').trigger('click');             
//               
//            var fn = window[callback];
//            fn(result);
        //                }
            $('.notify').text(result);     
        },
        error: function(error) {
           $('.notify').text('An Error Occured,See console');
           console.log(error);
          
        //alert("Some problems have occured. Please try again later: " );
        
        }
    });


}
 //for jqchart drawing chart s
$(document).ready(function(){
  // Our data renderer function, returns an array of the form:
  // [[[x1, sin(x1)], [x2, sin(x2)], ...]]
  function ajaxDataRenderer(url) {
    var ret = null;
    
    $.ajax({
      // have to use synchronous here, else the function 
      // will return before the data is fetched
      async: false,
      url:url ,
      dataType:"json",
      success: function(data) {
        ret = data;
        
      }
    });
    return ret;
  };
 var jsonurl = '/Test/score_json.php';
  var result = ajaxDataRenderer(jsonurl);
  console.log(result);
  var plot1_data = result['per'];
  var plot2_data = result['speed'];
  var plot1_avg = result['per_avg'];
  var plot2_avg = result['speed_avg'];
  set_remark(result['remark']);
  var plot1 = $.jqplot('chart1', plot1_data,{
    title: "% in each test(Target:80% Verbal,95% Quant)",
    axes:{yaxis:{min:0, max:100}},
    dataRendererOptions: {
      unusedOptionalUrl: jsonurl
    },
     seriesDefaults: { 
        showMarker:false,
        pointLabels: { show:true } 
      },
      
      canvasOverlay: {
        show: true,
        objects: [
          { rectangle: { ymin: 80, xminOffset: "0px", xmaxOffset: "0px", yminOffset: "0px", ymaxOffset: "0px",
                    color: "rgba(154,205,50, 0.3)", showTooltip: true, tooltipFormatString: "Target" } },
             {horizontalLine: {
                    name: 'Average',
                    y: plot1_avg,
                    lineWidth: 1,
                    color: 'rgb(89, 198, 154,0.3)',
                    shadow: false,
                    xminOffset: '0px',
                    xmaxOffset: '200px'
                }}
          
        ]
      } 
  });
 
  var plot2 = $.jqplot('chart2', plot2_data,{
    axes:{yaxis:{min:0, max:5}},
    title: "speed(Mins/Q) in each test(Target: 1 Min/Q)",
    seriesDefaults: { 
        showMarker:false,
        pointLabels: { show:true } 
      },
       
     canvasOverlay: {
        show: true,
        objects: [
          { rectangle: { ymax: 1, xminOffset: "0px", xmaxOffset: "0px", yminOffset: "0px", ymaxOffset: "0px",
                    color: "rgba(154,205,50, 0.3)", showTooltip: true, tooltipFormatString: "Target" } },
            {horizontalLine: {
                    name: 'Average',
                    y: plot2_avg,
                    lineWidth: 1,
                    color: 'rgb(89, 198, 154,0.3)',
                    shadow: false,
                    xminOffset: '0px',
                    xmaxOffset: '200px'
                }}
          
        ]
      } 
            
    
  });
});

function set_remark(data){
    if(!data){
        return false;
    }
    var htm = '<ul>';
    $(data).each(function(i,remark){
        htm+='<li>'+remark+'</li>';
    });
    htm+='</ul>';
    $('#remarks').html(htm);
}