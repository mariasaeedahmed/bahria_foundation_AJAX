<%@ Page Title="" Language="C#" MasterPageFile="~/Web/Master/SecTemp.Master" AutoEventWireup="true" CodeBehind="HRdashboard.aspx.cs" Inherits="ERP.Web.Pages.HRdashboard" %>

<asp:Content ID="Content1" ContentPlaceHolderID="head" runat="server">
    <script src="js/ajax_hr_dashboard.js"></script>
          
      <style>
         
            .fc-day-header, .fc-view-container {
                display: none;
            }

            .fc-row {
                height: auto;
            }

            .fc-toolbar, .fc-toolbar.fc-header-toolbar {
                padding: 0rem;
                margin-bottom: 0em;
            }


                .fc-toolbar .fc-header-toolbar {
                    margin: 0;
                    margin-left: auto;
                    padding: 0;
                }

            #Welcome {
                position: absolute;
                margin: 0px;
                display: inline-block;
                top: 50%;
                transform: translate(0%, -50%);
            }

            #top-bar {
                position: absolute;
                top: 0px;
                left: 0px;
                width: 100%;
                height: 5%;
                max-height: 45px;
                background-color: black;
                color: white;
            }

            .container {
                display: inline-block;
                cursor: pointer;
                margin-left: 10px;
                margin-right: 10px;
            }

            .bar1, .bar2, .bar3 {
                width: 35px;
                height: 5px;
                background-color: white;
                margin: 6px 0;
                transition: 0.4s;
            }

            #left-menu {
                display: none;
                position: absolute;
                background-color: black;
                color: white;
                left: 0;
                top: 4.8%;
                height: 100%;
                width: 25%;
                max-width: 270px;
            }

            .change .bar1 {
                -webkit-transform: rotate(-45deg) translate(-9px, 6px);
                transform: rotate(-45deg) translate(-9px, 6px);
            }

            .change .bar2 {
                opacity: 0;
            }

            .change .bar3 {
                -webkit-transform: rotate(45deg) translate(-8px, -8px);
                transform: rotate(45deg) translate(-8px, -8px);
            }

            #left-menu h1 {
                border-bottom-style: solid;
            }

            #left-menu .inactive {
                font-size: 25px;
                color: white;
                text-decoration: none;
            }

            #left-menu .active {
                font-size: 25px;
                color: rgba(255, 255, 255, 0.5);
                text-decoration: none;
            }

                #left-menu .active:hover {
                    color: white;
                }



            .main-content {
                position: relative;
                color: black;
                left: 0;
                height: 50%;
                width: 50%;
            }





            .cards {
                display: flex;
                flex-direction: row;
                gap: 15px;
            }

            .cards_for_filter {
                display: flex;
                flex-direction: column;
                gap: 15px;
                align-items: center;
            }

            .red {
                background-color: #f43f5e;
            }

            .blue {
                background-color: #3b82f6;
            }

            .green {
                background-color: #22c55e;
            }


            .cards .card_count {
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
                text-align: center;
                height: 100px;
                width: 200px;
                border-radius: 10px;
                color: white;
                cursor: pointer;
                transition: 400ms;
            }


            .for_filt {
                height: 75px;
                width: 175px;
            }

            .cards .card_count p.tip {
                font-size: 1em;
                font-weight: 700;
            }

            .cards .card_count p.second-text {
                font-size: .7em;
            }

            .col-4 {
                border: 2px solid red;
            }

            .cards .card_count:hover {
            }

            .total_enc {
                display: flex;
                flex-direction: row;
                column-gap: 15px;
                margin-top: 3.25rem;
            }

            .filter_box {
                padding: 10px;
                border: 2px red solid;
                width: 20%;
            }

            .text {
                border: 2px pink solid;
            }

            p {
                margin-block-start: 0.25em;
                margin-block-end: 0.25em;
            }


            .cards:hover > .card:not(:hover) {
                transform: scale(0.9, 0.9);
            }

            .whole_right {
                display: flexbox;
                flex-direction: row;
            }

            .row_2 {
                display: flex;
                justify-content: space-around;
                flex-direction: row;
            }
        </style>
    

</asp:Content>
<asp:Content ID="Content2" ContentPlaceHolderID="Body" runat="server">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
    <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/apexcharts"></script>
            

  <div class="total_enc">
        <div class="filter_box">
        <h2>Filters</h2>
           <div class=" cards cards_for_filter">
    <div class="card_count blue for_filt ">
        <p class="tip" id="P1">Region</p>
         <asp:DropDownList ID="ddl_CRegion" AutoPostBack="false" CssClass="ddl" Width="120px"
                                                runat="server"
                                                  Style="float: right; margin-right: 10px;"    >
                                            </asp:DropDownList>
    </div>
    <div class="card_count  blue for_filt">
        <p class="tip">Category</p>
                                <asp:DropDownList ID="ddl_category" AutoPostBack="false" CssClass="ddl" Width="120px"
                                                 runat="server"
                                                  Style="float: right; margin-right: 10px;" onchange="processing_data_and_sending_it()">
                                            </asp:DropDownList>
    </div>
    <div class="card_count  blue for_filt">
        <p class="tip">Designation</p>
            <asp:DropDownList ID="ddl_Designation" AutoPostBack="true" CssClass="ddl" Width="120px"
                                               runat="server"
                                                  Style="float: right; margin-right: 10px;" >
                                            </asp:DropDownList>

    </div>
                  <div class="col-4">
                      <asp:Label runat="server" ID="the_campus" ></asp:Label> 
            <%--<div id="myCalendar"></div>--%>
                      
        </div>
   
</div>

            </div>
 <div class="whole_right"> 
    <div class="class_box">
    <div class="cards">
    <div class="card_count blue">
        <p class="tip" id="HEAD COUNT">Head Count</p>
        <asp:Label ID="head_count_total"></asp:Label>
    </div>
    <div class="card_count blue">
        <p class="tip">Gross Salary</p>
<asp:Label ID="gsal" ></asp:Label>    </div>
    <div class="card_count blue">
        <p class="tip">Allowance</p>
<asp:Label ID="Allowances" ></asp:Label>    </div>
        <div class="card_count blue">
        <p class="tip">Deduction</p>
<asp:Label ID="Deduction" ></asp:Label>    </div>
        <div class="card_count blue">
        <p class="tip">Net Pay</p>
<asp:Label ID="NetPay" ></asp:Label>    </div>
</div>

    </div>
     <div class="row_2">
       
     
		<div class="mypiechart">
            <h2>Region-wise Head Count</h2>	
			<canvas id="myCanvas" width="300" height="300"></canvas>
		</div>
		
         
		<div class="mypiechart">	
            <h2>Employee Category Rate</h2>	
			<div id="myCanvas1" width="300" height="300"></div>
		</div>
		
	
	</div>
     <div class="row_2">
       
     
		
		<div class="mypiechart">	
            <h2>Gender Ratio</h2>
			<div id="myCanvas2" width="300" height="300"></div>
		</div>	
		

		
         
			<div class="mypiechart">
           
			<canvas id="bar_chart" ></canvas>
             
		</div>	
		
	
	</div>
     <div class="row_2">
     <div class="mypiechart">
            
			<canvas id="line_graph"   style="display: block; height: 26rem; width: 80%;" ></canvas>
             </div>

          <div class="mypiechart">
            
			<canvas id="region_wise_gs"   style="display: block; height: 26rem; width: 80%;" ></canvas>
             </div>
		

         
	</div>
     <div class="mypiechart">
            
			<div id="Salary_breakdown"   style="display: block; height: 26rem; width: 100%;" ></div>
             </div>

            </div>
  <script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels"></script>
      <script src="https://cdn.canvasjs.com/canvasjs.min.js"></script>
</head>     
    <script>
        
        ////////////////////////////////////////FUNCTION FOR PIE GRAPHS/////////
        function generatePieGraph(t,e){!function(){var t=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||window.msRequestAnimationFrame;window.requestAnimationFrame=t}();var o,i,n=e.hasOwnProperty("pie")?e.pie:"normal",r=e.values,a=e.colors,l=!!e.hasOwnProperty("animation")&&e.animation,s=e.hasOwnProperty("animationSpeed")?e.animationSpeed:20,f=!!e.hasOwnProperty("fillTextData")&&e.fillTextData,h=e.hasOwnProperty("fillTextColor")?e.fillTextColor:"#fff",P=e.hasOwnProperty("fillTextPosition")?e.fillTextPosition:"horizontal",u=e.hasOwnProperty("fillTextAlign")?e.fillTextAlign:1.85,c=e.hasOwnProperty("doughnutHoleSize")?e.doughnutHoleSize:null,d=e.hasOwnProperty("doughnutHoleColor")?e.doughnutHoleColor:"#fff",m=e.hasOwnProperty("offset")?e.offset:null,p=null,g=L(e,"strokeStartEndPoints")?e.isStrokePie.strokeStartEndPoints:"No",v=!!L(e,"overlayStroke")&&e.isStrokePie.overlayStroke,k=L(e,"overlayStrokeColor")?e.isStrokePie.overlayStrokeColor:"#eee",M=!L(e,"strokeAnimation")||e.isStrokePie.strokeAnimation,S=L(e,"strokeAnimationSpeed")?e.isStrokePie.strokeAnimationSpeed:10,y=L(e,"stroke")?e.isStrokePie.stroke:20,w=L(e,"fontSize")?e.isStrokePie.fontSize:"60px",I=L(e,"textAlignement")?e.isStrokePie.textAlignement:"center",A=L(e,"fontFamily")?e.isStrokePie.fontFamily:"Arial",T=L(e,"fontWeight")?e.isStrokePie.fontWeight:"bold",x=document.getElementById(t),b=x.getContext("2d"),O=x.width/2,C=x.height/2,F=O,z=0,q=[],H=(o=0,r.map(t=>{o+=t}),o),E=0,R=0;if(r.length>1)for(var W=0;W<r.length;W++){var Y=0==W?0:E;E=r[W]*(100/H)+Y,q.push([Math.round(Y),Math.round(E),a[W]])}function j(){q.forEach(function(t,e){var o=t[0]/100*Math.PI*2,i=null!=m?(t[1]-m/10)/100*Math.PI*2:t[1]/100*Math.PI*2,n=((o="Top"==p?o-Math.PI/2:o)+(i="Top"==p?i-Math.PI/2:i))/2;offsetX=0==m||null==m?0:Math.cos(n)*m,offsetY=0==m||null==m?0:Math.sin(n)*m,b.beginPath(),b.moveTo(O+offsetX,C+offsetY),b.arc(O+offsetX,C+offsetY,F,o,i),b.fillStyle=t[2],b.fill(),b.fillStyle=d,b.beginPath(),b.moveTo(O,C),b.arc(O,C,c/100*C,0,2*Math.PI),b.closePath(),b.fill()})}function X(t){return t/100*(2*Math.PI)}function B(t,e,o,i,n,r,a){b.beginPath(),b.arc(t,e,o,i,n,!1),b.strokeStyle=r,b.lineWidth=a,b.stroke()}function D(t,e){b.clearRect(0,0,x.width,x.height),1==e&&(b.beginPath(),b.arc(O,C,F-y,X(0)-Math.PI/2,X(100)-Math.PI/2),b.strokeStyle=k,b.lineWidth=y,b.stroke()),b.font=T+" "+w+" "+A,b.textAlign=I,b.textBaseline="middle","Yes"==g&&B(O,C,F-y/2,X(0)-Math.PI/2,X(.1)-Math.PI/2,a[0],y),B(O,C,F-y,X(0)-Math.PI/2,X(t)-Math.PI/2,a[0],y),"Yes"==g&&B(O,C,F-y/2,X(t-.1)-Math.PI/2,X(t)-Math.PI/2,a[0],y),b.fillText(t+"%",O,C)}function L(t,e){if("object"==typeof t&&null!==t){if(t.hasOwnProperty(e))return!0;for(var o in t)if(t.hasOwnProperty(o)&&L(t[o],e))return!0}return!1}!function e(){1==r.length&&"stroke"==n?function(){var t=0;if(1==M&&0==v)var e=setInterval(function(){D(++t,v),t>=r[0]&&clearInterval(e)},S);else if(1==v){if(0==M&&D(r[0],v),1==M)var e=setInterval(function(){D(++t,v),t>=r[0]&&clearInterval(e)},S)}else D(r[0],v)}():1==l&&"normal"==n?(b.clearRect(0,0,x.width,x.height),j(),o=z/100*Math.PI*2,b.globalCompositeOperation="destination-in",b.beginPath(),b.moveTo(O,C),b.arc(O,C,F,0,o),b.fill(),b.globalCompositeOperation="source-over",z++<100&&setTimeout(function(){requestAnimationFrame(e)},s)):(j(),b.beginPath(),b.arc(O,C,F+5,0,2*Math.PI,!1),b.lineWidth=30,b.strokeStyle=d,b.stroke());var o;if(101==z){if(1==f&&"inner"==P)for(var c=0;c<r.length;c++){i=r[c]/H*Math.PI*2;var m=C/u,g="Top"==p?O+m*Math.cos(R+i/2-Math.PI/2):O+m*Math.cos(R+i/2),k="Top"==p?C+m*Math.sin(R+i/2-Math.PI/2):C+m*Math.sin(R+i/2),y=r[c]*(100/H);b.fillStyle=h,b.font="bold 16px Arial",b.textAlign="center",b.fillText(y.toFixed(1)+"%",g,k),R+=i}if(1==f&&"horizontal"==P){for(var w='<div class="pie-horizontal-list"><ul>',c=0;c<r.length;c++)w+='<li><span style="background: '+a[c]+'"></span> '+r[c]*(100/H)+" %<li>";w+="</ul></div>",x.insertAdjacentHTML("afterend",w)}if(1==f&&"vertical"==P){for(var w='<div class="pie-vertical-list-'+t+'"><ul>',c=0;c<r.length;c++)w+='<li><span style="background: '+a[c]+'"></span> '+r[c]*(100/H)+" %<li>";w+="</ul></div>",x.parentElement.insertAdjacentHTML("beforeend",w)}}}()}
        /////////////////fuction for drawing keys
        var ddlCRegionClientID = '<%= ddl_CRegion.ClientID %>';

        
       

        //for region wise head count
        //var obj = {
        //    values: [15, 50, 20, 85, 30],
        //    colors: ['#4CAF50', '#00BCD4', '#E91E63', '#FFC107', '#9E9E9E'],
        //    animation: false,
        //    fillTextData: true,
        //    fillTextColor: '#fff',
        //    fillTextAlign: 1.3, 
        //    fillTextPosition: 'inner',
        //    doughnutHoleSize: 60,
        //    doughnutHoleColor: '#fff',
        //    offset: 1
        //};
		
        //generatePieGraph('myCanvas', obj);
     
        // for employee category rate

        //var obj1 = {
        //    values: [15, 50, 20, 85, 30],
        //    colors: ['#4CAF50', '#00BCD4', '#E91E63', '#FFC107', '#9E9E9E'],
        //    animation: false,
        //    fillTextData: true,
        //    fillTextColor: '#fff',
        //    fillTextAlign: 1.3, 
        //    fillTextPosition: 'inner',
        //    doughnutHoleSize: 60,
        //    doughnutHoleColor: '#fff',
        //    offset: 1
        //};
        //generatePieGraph('myCanvas1', obj1);



        //var obj2 = {
        //    values: [25, 75],
        //    colors: ['#4CAF50', '#00BCD4'],
        //    animation: true,
        //    animationSpeed: 10,
        //    fillTextData: true,
        //    fillTextColor: '#fff',
        //    fillTextAlign: 1.50, 
        //    fillTextPosition: 'inner',
        //    doughnutHoleSize: null,
        //    doughnutHoleColor: '#fff',
        //    offset: 1
        //};
        //generatePieGraph('myCanvas2', obj2);


        //var options = {
        //    series: [{
        //        data: [400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380]
        //    }],
        //    chart: {
        //        type: 'bar',
        //        height: 350
        //    },
        //    plotOptions: {
        //        bar: {
        //            borderRadius: 4,
        //            horizontal: true,
        //        }
        //    },
        //    dataLabels: {
        //        enabled: false
        //    },
        //    xaxis: {
        //        categories: ['South Korea', 'Canada', 'United Kingdom', 'Netherlands', 'Italy', 'France', 'Japan',
        //          'United States', 'China', 'Germany'
        //        ],
        //    }
        //};
       
        ////var chart = new ApexCharts(document.querySelector("#bar_chart"), options);
        ////chart.render();
        //var chart = new ApexCharts(document.getElementById("bar_chart"), options);
        //chart.render();
        ///////////////////// FOR THE LINE GRAPH
        //xValues = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
        //yValues = [7,null,8,9,9,9,10,null,14,14,15,6];

        //new Chart("line_graph", {
        //    type: "line",
        //    data: {
        //        labels: xValues,
        //        datasets: [{
        //            fill: false,
        //            lineTension: 0,
        //            backgroundColor: "rgba(0,0,255,1.0)",
        //            borderColor: "rgba(0,0,255,0.1)",
        //            data: yValues
        //        }]
        //    },
        //    options: {
        //        legend: {display: false},
        //        scales: {
        //            yAxes: [{ticks: {min: 6, max:16}}],
        //        },
        //        title: {
        //    display: true,
        //    text: "Joining Dates By Month"
        //},
        //    }
        //});

        var xValues = ["North"];
        var yValues = [55, 49, 44];
        var barColors = [ "green"];

        //new Chart("region_wise_gs", {
        //    type: "bar",
        //    data: {
        //        labels: xValues,
        //        datasets: [{
        //            backgroundColor: barColors,
        //            data: yValues
        //        }]
        //    },
        //    options: {
        //        legend: {display: false},
        //        title: {
        //            display: true,
        //            text: "Region-wise Gross Salary"
        //        }
        //    }
        //})




        ///////////////////// FOR THE LINE GRAPH
        //xValues = ["Below 1 year","1 year","3 years","5 years","10 years"];
        //yValues = [7,8,8,9,9];

        //new Chart("bar_chart", {
        //    type: "horizontalBar",
        //    data: {
        //        labels: xValues,
        //        datasets: [{
        //            fill: true,
        //            lineTension: 0,
        //            backgroundColor: "rgba(0,0,255,1.0)",
        //            borderColor: "rgba(0,0,255,0.1)",
        //            data: yValues
        //        }]
        //    },
        //    plotOptions:{
        //        horizontal:false
        //    },
        //    options: {
        //        legend: {display: false},
        //        horizontal:false,
        //        scales: {
        //            yAxes: [{ticks: {min: 6, max:16}}],
        //        },
        //        title: {
        //            display: true,
        //            text: "Service Tenure"
        //        },
        //    }
        //});


        //xValues = ["Basic","H.rent","Dar All","Conv","Med","Adhoc","Gross","Allowance","Red","Net"];
        //yValues = [7,8,8,9,9,9,10,11,14,14];

        //new Chart("Salary_breakdown", {
        //    type: "line",
        //    data: {
        //        labels: xValues,
        //        datasets: [{
        //            fill: false,
        //            lineTension: 0,
        //            backgroundColor: "rgba(0,0,255,1.0)",
        //            borderColor: "rgba(0,0,255,0.1)",
        //            data: yValues
        //        }]
        //    },
        //    options: {
        //        legend: {display: false},
        //        scales: {
        //            yAxes: [{ticks: {min: 6, max:16}}],
        //        },
        //        title: {
        //            display: true,
        //            text: "Salary Break Down"
        //        },
        //    }
        //});

        
  
    </script>
    
    
</asp:Content>
