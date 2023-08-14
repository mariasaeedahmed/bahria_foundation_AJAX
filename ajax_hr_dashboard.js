var response_global
var headcount_chart
var gross_salary_chart
var gender_chart
var category_chart
var salary_break_down_chart
var tenure_of_service_chart
var hiring_record_chart
var selection_of_region=0
// $(document).ready(
// //for now we will give like fixed values and not kuch aur
// function populateBFCDropdown() {
//   alert('we haere')
//   var json = document.getElementById('ctl00_Body_ddl_CRegion').value;
//   var regionid = Sys.Serialization.JavaScriptSerializer.serialize(json);
//   alert('now population BFC')
//   $.ajax({
//     type: "POST",
//     url: "HRdashboard.aspx/GetBFCData",
//     data: "{RegionID: " + regionid + "}",
//     contentType: "application/json; charset=utf-8",
//     dataType: "json",
//     success: function (r) {
//       alert(r)
//       console.log(r)
//         var ddlCustomers = $("[id*=ddl_category]");
//         ddlCustomers.empty().append('<option selected="selected" value="0">All</option>');
//         $.each(r.d, function () {
//             ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
//         });
//     }

 
// })
// })
// $(document).ready(
//   function getting_data() {
//     alert('end of one');
    
//  var bfcid=0
//  var regid=0

//     $.ajax({
//       type: "POST",
//       url: "HRdashboard.aspx/Executing_SP",
//        //data: JSON.stringify({ NIC: nic, arg1: value1, arg2: value2 }),
//       contentType: "application/json; charset=utf-8",
//       dataType: "json",
//       success: function (r) {
//         response_global=r
//         //.log(headCounts);
//         processing_data_and_sending_it()
//          //NOW WE NEED TO SEND IT TO A FUNCTION WHICH WILL PROCESS IT FURTHER AND SEND IT TO OTHER THIGNS
//           //create_rectangle(r)
//       }
  
  
  
  
  
//   });
  
  
//     },
   
    

  
  
//   );

// $(document).ready(function() {
//   // First function
//   function populateBFCDropdown() {
//       alert('we are here');
//       var json = document.getElementById('ctl00_Body_ddl_CRegion').value;
//       var regionid = Sys.Serialization.JavaScriptSerializer.serialize(json);
//       alert('now populating BFC');
//       $.ajax({
//           type: "POST",
//           url: "HRdashboard.aspx/GetBFCData",
//           data: "{RegionID: " + regionid + "}",
//           contentType: "application/json; charset=utf-8",
//           dataType: "json",
//           success: function(r) {
//               alert(r);
//               console.log(r);
//               var ddlCustomers = $("[id*=ddl_category]");
//               ddlCustomers.empty().append('<option selected="selected" value="0">All</option>');
//               $.each(r.d, function() {
//                   ddlCustomers.append($("<option></option>").val(this['Value']).html(this['Text']));
//               });
//           }
//       });
//   }

//   // Second function
//   function getting_data() {
//       alert('end of one');

//       var bfcid = 0;
//       var regid = 0;

//       $.ajax({
//           type: "POST",
//           url: "HRdashboard.aspx/Executing_SP",
//           //data: JSON.stringify({ NIC: nic, arg1: value1, arg2: value2 }),
//           contentType: "application/json; charset=utf-8",
//           dataType: "json",
//           success: function(r) {
//               response_global = r;
//               //.log(headCounts);
//               processing_data_and_sending_it();
//               //NOW WE NEED TO SEND IT TO A FUNCTION WHICH WILL PROCESS IT FURTHER AND SEND IT TO OTHER THIGNS
//               //create_rectangle(r)
//           }
//       });
//   }

  // Call the functions
//   populateBFCDropdown();
//   getting_data();
// });

$(document).ready(function() {
  // First function

  function populateBFCDropdown() {
      alert("using populate BFC dropdown");
      var json = document.getElementById('ctl00_Body_ddl_CRegion').value;
      var regionid = Sys.Serialization.JavaScriptSerializer.serialize(json);
      alert("region id FOR EXECUTING IS ",regionid)
      alert(regionid)

      var campusLabel = document.getElementById('ctl00_Body_the_campus');
      var campus = campusLabel.innerText || campusLabel.textContent;
     // var campus = document.getElementById('ctl00_Body_the_campus').value;
      alert("campus id",campus)
      var campus_to_use = Sys.Serialization.JavaScriptSerializer.serialize(campus);
      alert(campus_to_use);

      //var the_school = document.getElementById('ctl00_Body_ddl_category').value;
     // var fixed_school = Sys.Serialization.JavaScriptSerializer.serialize(the_school);
      //maria=this.for_fixed_school
      alert('now populating BFC');
      $.ajax({
          type: "POST",
          url: "HRdashboard.aspx/GetBFCData",
          

          data: "{RegionID: " + regionid +  ", is_school:"+campus_to_use+"}",
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(r) {
              alert(r);
              console.log(r);
              var ddlCustomers = $("[id*=ddl_category]");
              console.log(regionid,0)
             // Number(stringNumber)
              // if(Number(regionid)==0){
              //   alert("we populationg by all")
              //   ddlCustomers.empty().append('<option selected="selected" value="0">All</option>');
              // }
              // else{
              //   alert("we emptying")
              //   ddlCustomers.empty()
              // }
              alert("ethis is campus to use ")
              alert(campus)
             
              if(campus!=0){
                alert("we emptying")
                ddlCustomers.empty()
              }
              else{
                alert("we populationg by all")
                  ddlCustomers.empty().append('<option selected="selected" value="0">All</option>');
              }
             
              $.each(r.d, function() {
                  ddlCustomers.append($("<option></option>").val(this['BID']).html(this['BFCName']));
              });
          }
      });
  }

  // Second function
  function getting_data() {
      alert('end of one');

      var bfcid = 0;
      var regid = 0;

      $.ajax({
          type: "POST",
          url: "HRdashboard.aspx/Executing_SP",
          //data: JSON.stringify({ NIC: nic, arg1: value1, arg2: value2 }),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function(r) {
              response_global = r;
              //.log(headCounts);
              processing_data_and_sending_it();
              //NOW WE NEED TO SEND IT TO A FUNCTION WHICH WILL PROCESS IT FURTHER AND SEND IT TO OTHER THIGNS
              //create_rectangle(r)
          }
      });
  }
  populateBFCDropdown();
  // Call the functions
  getting_data();

  
  $("#ctl00_Body_ddl_CRegion").on("change", function() {
    // Call the functions when the element changes
    selection_of_region=1
    populateBFCDropdown();
    processing_data_and_sending_it()
   
    
});
});


  //populateRegionDropdown();
  
  function processing_data_and_sending_it(){
    data=response_global
    // filling in the cards
   
   //HERE WE WILL GET THE VALUES OF THE DROP DOWN
  //  if(document.getElementById("ddl_CRegion").value==null){
  // regID=0
  // bid=0
  //  }
  //  else{
    // var ddlCRegionClientID = '<%= ddl_CRegion.ClientID %>';
    // var regID=document.getElementById(ddlCRegionClientID).value
    var regID=document.getElementById('ctl00_Body_ddl_CRegion').value
   //console.log( document.getElementById('ctl00_Body_ddl_CRegion').text)
   
    var bid= document.getElementById('ctl00_Body_ddl_category').value
    if(selection_of_region==1){
      bid=0
      selection_of_region=0
    }
    console.log(bid)
    alert("bid")
  // } 
  alert(bid)

  alert(document.getElementById('ctl00_Body_ddl_CRegion').value, document.getElementById('ctl00_Body_ddl_category').value)
  
  
   // NOW WE HAVE THE WHOLE table parsed
    var response = JSON.parse(data.d);
    //these are needed for when admin logs in
 var north_count=0
 var south_count=0
 var center_count=0
 var north_count_gs=0
 var south_count_gs=0
 var center_count_gs=0
    //an array of head counts and regions and gross salary we get
    var headCounts = response.map(function(item) {
      return item.HeadCountByRegions;
    });
    var RID = response.map(function(item) {
      return item.RegionID;
    });
    var Gross_salary_col = response.map(function(item) {
      return item["GROSS_SALARY"];
    });
    
    //n1 s2 c3
     var reg_count=0;
     var gross_sal_count=0
    //var gross_salary_region_wise=0
    //if region id is not 0 so find the head count of the specific region
    // if it is 0 find the head count and gross salary of all regions separately
    // 
    if(regID!=0 && bid!=0)
   { for (var i=0;i<headCounts.length;i++){
    //console.log(RID[i])
      if(RID[i]==regID){
        reg_count=reg_count+headCounts[i];
        gross_sal_count=gross_sal_count+Gross_salary_col[i]
      }
    }
  }
    else if (regID==0){
      for (var i=0;i<headCounts.length;i++)
      {
        if(RID[i]==1){
       north_count=north_count+headCounts[i]
       north_count_gs=north_count_gs+headCounts[i]
      }
      if(RID[i]==2){
        south_count=south_count+headCounts[i]
        south_count_gs=south_count_gs+headCounts[i]
      }
      if(RID[i]==3){
      center_count=center_count+headCounts[i]
      center_count_gs=center_count_gs+headCounts[i]
      }
    }


    }
   // we need to know which option is selected
   // if a bid is selected then bid !=0 and RID !=0 so we find a specif row in the database
    var row_required;
    if(regID!=0 && bid!=0)// iss ka matlab hai region id is not 0
   { 
    alert("we are finding a school")
    alert(regID,bid)
    for (var i = 0; i < response.length; i++) {
      //alert("infor")
      console.log("one comp")
      console.log(parseInt(response[i].BID),parseInt(bid))
      console.log(response[i].RegionID , regID)
      if (parseInt(response[i].BID) === parseInt(bid) && parseInt(response[i].RegionID) === parseInt(regID)) {
        console.log(response[i])
        row_required= response[i];
        break;
      }
    }
  }
  
  // if rid is 0 that means bid is also 0 so we will use the last row of the data base
   else if(regID==0 && bid==0){//then BID toh hogaa hee 0
      alert("reg id and bid is 0")
    alert(regID,bid)

      row_required= response[response.length-1];
     

    }
   else if(regID!=0 && bid==0){//then BID toh hogaa hee 0
    alert("reg id is not 0 and bid is 0")
    alert(regID,bid)

     if(regID==1)
      row_required= response[response.length-4];
      else if (regID==2){
      row_required= response[response.length-3];

      }
      else if (regID==3){
        row_required= response[response.length-2];
  
        }


    }
   


    less_than_one=row_required["Below 1 years"]
    one_year=row_required["1 years"]
    three_years=row_required["3 years"]
    five_years=row_required["5 years"]
    ten_years=row_required["10 years"]
    after_ten_years=row_required["After 10 years"]
    

    var label = document.getElementById("head_count_total");
    label.textContent = row_required["HeadCountByRegions"];
    var label = document.getElementById("gsal");
    label.textContent = row_required["GROSS_SALARY"];
    var label = document.getElementById("Allowances");
    label.textContent = row_required["Allowance"]
    var label = document.getElementById("Deduction");
    label.textContent = row_required["Deduction"]
    var label = document.getElementById("NetPay");
    label.textContent =row_required["NET_SALARY"];


    
    console.log("found")
console.log("rid is")
   console.log(RID)
console.log("the RID is")

    if(regID==0){
      alert("for head count all 3")
      yValues=["North","South","Center"]
      xValues=[north_count,south_count,center_count]
      generateHeadCount('myCanvas', yValues,xValues);
      xValues=[north_count_gs,south_count_gs,center_count_gs]
      region_wise_gs('region_wise_gs', yValues,xValues);
    }
    else{
      alert("we here")
     newArr=[row_required["HeadCountByRegions"]]
     newArr2=[row_required["BID"]]
      generateHeadCount('myCanvas',newArr2 , newArr );
      newArr=[row_required["GROSS_SALARY"]]
    // newArr2=row_required["BID"]
     region_wise_gs('region_wise_gs',newArr2 , newArr );
    }
    //console.log()
    civil=row_required["Civilian"]
    Ex_navy_emps=row_required["Ex-Navy"]
    others=row_required["Other"]


newArray = [Ex_navy_emps,civil,others];
   

    males=row_required["M"]
    femals=row_required["F"]
    
   GenderArray=[males,femals];
  


    j=row_required["0"]
    f=row_required["1"]
    m=row_required["2"]
    a=row_required["3"]
    ma=row_required["4"]
    jun=row_required["5"]
    jul=row_required["6"]
    aug=row_required["7"]
    sep=row_required["8"]
    oct=row_required["9"]
    nov=row_required["10"]
    dec=row_required["11"]
    joining_Data=[j,f,m,a,ma,jun,jul,aug,sep,oct,nov,dec]


    less_than_one=row_required["Below 1 years"]
    one_year=row_required["1 years"]
    three_years=row_required["3 years"]
    five_years=row_required["5 years"]
    ten_years=row_required["10 years"]
    after_ten_years=row_required["After 10 years"]
    tenure_of_services=[less_than_one,one_year,three_years,five_years,ten_years,after_ten_years]


    Basic=row_required["BASIC_SALARY"]
    rent=row_required["HOURSE_RENT"]
    Dar=row_required["DARENESS"]
    Conv=row_required["CONVEY"]
    Med=row_required["MEDICAL"]
    Adhoc=row_required["ADHOC_RELICF"]
    Gross=row_required["GROSS_SALARY"]
    Net=row_required["NET_SALARY"]
    all=row_required["Allowance"]
    ded=row_required["Deduction"]
    SalaryBreakdown=[Basic,rent,Dar,Conv,Med,Adhoc,Gross,all,ded,Net]
   
     
    generateEmployeeCtgr('myCanvas1', newArray);
    generateGenderChart('myCanvas2', GenderArray) 
    console.log(joining_Data)
    // for(var i=0;i<joining_Data.length;i++){
    //   if(joining_Data[i]==null)
    //   {
    //     joining_Data[i]=0
    //   }
    // }
    console.log("this is the joining")
    console.log(joining_Data);
    generateJoiningDatesByMonth("line_graph",joining_Data)
    tenure_of_service("bar_chart",tenure_of_services)
    salary_break_down("Salary_breakdown",SalaryBreakdown)
     
    //empl
    // canvas names we will hard code
    // first page load we will make one for of them
    // then we will make a function for all region ids    
  } 
  
  function clearCanvas(canvasId) {
    var canvas = document.getElementById(canvasId);
    var context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  function generateHeadCount(canvasId, xValues, yValues) {
    if (headcount_chart) headcount_chart.destroy();
    console.log(xValues)
    console.log(yValues)
    
    var barColors = [ "green","pink","purple"];
    headcount_chart=new Chart(canvasId, 
      {
        
      type: "bar",
      data: {
          labels: xValues,
          datasets: [{
              backgroundColor: barColors,
              data: yValues
          }]
      },
      options: {
          legend: {display: false},
          title: {
              display: true,
              text: "Region Head Count"
          },
          scales: {
            yAxes: [{ticks: {min: 0}}],
            precision:0
        },
        
        hover:{
          node:null
        }
       
      
      }
  })
  }

 
//generatePieGraph('myCanvas1', obj1);

function generateEmployeeCtgr(CanvasID, vals)
{
  if (category_chart) category_chart.destroy();
  
 // clearCanvas(canvasId)
// new Chart(CanvasID, {
//   type: "pie",
//   data: {
//     labels: ['Ex-Navy','Civil','Others'],
//     datasets: [{
//       backgroundColor: ["green","pink","blue"],
//       data: vals
//     }]
//   },
//   options: {
//     title: {
//      // display: true,
      
//     }
//   }



// });

var options = {
  series:vals ,
  chart: {
  width: 380,
  type: 'pie',
},
labels: ['Ex-Navy','Civil','Others'],
responsive: [{
  breakpoint: 480,
  options: {
    chart: {
      width: 200
    },
    legend: {
      position: 'bottom'
    }
  }
}]
};

category_chart = new ApexCharts(document.getElementById(CanvasID), options);
category_chart.render();
;}
// function generateEmployeeCtgr(canvasId, values) {
//   alert("generatating pie for categories");
//   console.log(values)
//   var obj1 = {
//     values: values,
//     colors: ['#4CAF50', '#00BCD4', '#E91E63'],
//     animation: false,
//     fillTextData: true,
//     fillTextColor: '#fff',
//     fillTextAlign: 1.3, 
//     fillTextPosition: 'inner',
//     doughnutHoleSize: null,
//     doughnutHoleColor: '#fff',
//     offset: 1
// };
  
//   generatePieGraph(canvasId, obj1);
// }



function generateGenderChart(CanvasID, yValues) {
  console.log("gender chart")
  console.log(yValues)

  if (gender_chart) gender_chart.destroy();
//   var xValues = ["Male", "Female"];
// //var yValues = [42, 21, 24.5, 9, 3.1];

// var chart = new CanvasJS.Chart(CanvasID, {
//   theme: "light2",
//   animationEnabled: true,
 
//   data: [{
//     type: "pie",
//     indexLabelFontSize: 18,
//     radius: 80,
//     indexLabel: "{label} - {y}",
//     yValueFormatString: "###0.0\"%\"",
//     click: explodePie,
//     dataPoints: xValues.map((label, index) => ({ label, y: yValues[index] }))
//   }]
// });

// chart.render();


// function explodePie(e) {
// 	for(var i = 0; i < e.dataSeries.dataPoints.length; i++) {
// 		if(i !== e.dataPointIndex)
// 			e.dataSeries.dataPoints[i].exploded = false;
// 	}
// }
var options = {
  series:yValues ,
  chart: {
  width: 380,
  type: 'pie',
},
labels: ['Male', 'Female'],
responsive: [{
  breakpoint: 480,
  options: {
    chart: {
      width: 200
    },
    legend: {
      position: 'bottom'
    }
  }
}]
};

gender_chart = new ApexCharts(document.getElementById(CanvasID), options);
gender_chart.render();
 // generatePieGraph(canvasId, obj2);
}
function generateJoiningDatesByMonth(canvasId, y_value){
  xValues = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  //yValues = [7,null,8,9,9,9,10,null,14,14,15,6];
  if (hiring_record_chart) hiring_record_chart.destroy();
  
  console.log()
  hiring_record_chart= new Chart(canvasId, {
      type: "line",
      data: {
          labels: xValues,
          datasets: [{
              fill: false,
              lineTension: 0,
              backgroundColor: "rgba(0,0,255,1.0)",
              borderColor: "rgba(0,0,255,0.1)",
              data: y_value
          }]
      },
      options: {
          legend: {display: false},
          scales: {
              //yAxes: [{ticks: {min: 0, max:16}}],
          },
          title: {
      display: true,
      text: "Joining Dates By Month"
  },
      }
  });
}
function tenure_of_service(canvasId, vals){
  xValues = ["Below 1 year","1 year","3 years","5 years","10 years", "after 10 years"];
  //yValues = [7,8,8,9,9];
  if (tenure_of_service_chart) tenure_of_service_chart.destroy();
console.log(vals)
tenure_of_service_chart= new Chart(canvasId, {
      type: "horizontalBar",
      data: {
          labels: xValues,
          datasets: [{
              fill: true,
              lineTension: 0,
              backgroundColor: "rgba(0,0,255,1.0)",
              borderColor: "rgba(0,0,255,0.1)",
              data: vals
          }]
      },
      plotOptions:{
          horizontal:false
      },
      options: {
          legend: {display: false},
          horizontal:false,
          scales: {
           //   yAxes: [{ticks: {min: 0, max:100}}],
          },
          title: {
              display: true,
              text: "Service Tenure"
          },
      }
  });
}
function salary_break_down(canvasID, vals){
console.log(vals)
if (salary_break_down_chart) salary_break_down_chart.destroy();

  xValues = ["Basic","H.rent","Dar All","Conv","Med","Adhoc","Gross","Allowance","Red","Net"];
  //yValues = [7,8,8,9,9,9,10,11,14,14];
//  console.log(vals)
//   new Chart("Salary_breakdown", {
//       type: "line",
//       data: {
//           labels: xValues,
//           datasets: [{
//               fill: false,
//               lineTension: 0,
//               backgroundColor: "rgba(0,0,255,1.0)",
//               borderColor: "rgba(0,0,255,0.1)",
//               data: vals
//           }]
//       },
//       options: {
//           legend: {display: false},
//           scales: {
//               yAxes: [{ticks: {min: 0, max:6000000}}],
//           },
//           title: {
//               display: true,
//               text: "Salary Break Down"
//           },
//       }
//   });

var options = {
  series:vals ,
  chart: {
  width: 380,
  type: 'pie',
},
labels:xValues 
,
responsive: [{
  breakpoint: 480,
  options: {
    chart: {
      width: 200
    },
    legend: {
      position: 'bottom'
    }
  }
}]
};

salary_break_down_chart = new ApexCharts(document.getElementById(canvasID), options);
salary_break_down_chart.render();
}

function region_wise_gs( canvasID,xvals,yvals){
 
  if (gross_salary_chart) gross_salary_chart.destroy();
  

  gross_salary_chart= new Chart(canvasID, {
    type: "bar",
    data: {
        labels: xvals,
        datasets: [{
            backgroundColor: barColors,
            data: yvals
        }]
    },
    options: {
        legend: {display: false},
        title: {
            display: true,
            text: "Region-wise Gross Salary"
        }
    }
})
}






