//Code for drawing Google charts

//Loading needed packages for the charts to run
google.charts.load('current', {'packages':['corechart', 'gauge']});
//When they load, call init()
google.charts.setOnLoadCallback(function() { init() });

//Global variables to be used in the script
var msgCount = 0;
var runningAvg = 0;
var freqData = null;

//Initialize the freqData DataTable for the line chart
//And make an initial call to drawCharts
function init() {
    freqData = new google.visualization.DataTable();
    freqData.addColumn('number', 'Day');
    freqData.addColumn('number', 'Frequency');
    //Add rows for each of the possible values in the line chart
    freqData.addRows([[2, 0],[3, 0],[4, 0],[5, 0],[6, 0],
                        [7, 0],[8, 0],[9, 0],[10, 0],[11, 0],[12, 0]]);
    drawCharts(null);
}

//Main function to draw all the types of charts
function drawCharts(msg) {
    //Get the data from the JSON message
    //And use it to update charts
    if (msg != null) {
        msgCount += 1;
        var die1 = msg["Die1"];
        var die2 = msg["Die2"];
        updateRollCharts(die1, die2);
        updateAvgCharts(die1, die2);
        updateFreqChart(die1, die2);
    }
    //If msg is null (initial condition), draw with
    //default settings
    else {
        updateRollCharts(0, 0);
        updateAvgCharts(0, 0);
        updateFreqChart(0, 0);
    }
}

//Update the charts that show the two individual dice rolls
function updateRollCharts(die1, die2) {

    //Initialize the DataTable that will be used to draw
    //the charts
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Die1', 0],
        ['Die2', 0]
    ]);

    //Set customizable options for displaying the chart
    var rollOptions = {
        width: 400,
        height: 120,
        min: 1,
        max: 6,
        minorTicks: 0,
        majorTicks: ['1', '2', '3', '4', '5', '6']
    };

    //Initialize a place where the charts can be drawn
    var rollCharts = new google.visualization.Gauge(document.getElementById('roll-charts'));

    //Update first chart - die1 value
    data.setValue(0, 1, die1);
    rollCharts.draw(data, rollOptions);

    //Update second chart - die2 value
    data.setValue(1, 1, die2);
    rollCharts.draw(data, rollOptions);
}

//
function updateAvgCharts(die1, die2) {
    //Initialize the DataTable that will be used to draw
    //the charts
    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Dice Sum', 0],
        ['Avg. Sum', 1]
    ]);

    //Set customizable options for displaying the chart
    var avgOptions = {
        width: 400,
        height: 120,
        min: 2,
        max: 12,
        minorTicks: 2,
        majorTicks: ['2', '4', '6', '8', '10', '12']
    };

    var avgCharts = new google.visualization.Gauge(document.getElementById('avg-charts'));

    //Find the sum of die1 and die2 and display it
    var sum = parseInt(die1) + parseInt(die2);
    data.setValue(0, 1, sum);
    avgCharts.draw(data, avgOptions);

    //Calculate the new average based on the running average
    //And the new sum that was just rolled
    if (msgCount > 0) {
        var newAvg = (runningAvg * ((msgCount - 1) / msgCount)) + (sum * (1 / msgCount));
        runningAvg = newAvg;
    }
    //Set newAvg = 0 if it's the first drawing (no messages yet)
    else {
        var newAvg = 1;
    }
    data.setValue(1, 1, newAvg);
    avgCharts.draw(data, avgOptions);
}

//Update the line chart
function updateFreqChart(die1, die2) {
    var sum = parseInt(die1) + parseInt(die2);
    var total = 0;

    //Iterate through the freqData DataTable and update
    //Each value with its new frequency
    for (var i = 0; i < 11; i++) {
        var freq = freqData.getValue(i, 1);
        var sumRow = i + 2;
        //Check if the sum is equal to the current value in freqData
        if (sum == sumRow) {
            var numTimes = freq * (msgCount - 1);
            numTimes += 1;
            console.log("sum: " + sum + ",numTimes: " + numTimes + ",freq: " + freq);
            //Update the correct freqData table with
            //The new value
            if (msgCount == 0) {
                freqData.setValue(i, 1, 0);
            }
            else {
                freqData.setValue(i, 1, numTimes/msgCount);
            }
        }
        else {
            var numTimes = freq * (msgCount - 1);
            //Update the correct freqData table with
            //The new value
            if (msgCount == 0) {
                freqData.setValue(i, 1, 0);
            }
            else {
                freqData.setValue(i, 1, numTimes/msgCount);
            }
        }
    }

    //Set customizable options for the DataTable when it's drawn
    var options = {
        title: 'Frequency of Dice Roll Sums',
        legend: { position: 'bottom' },
        hAxis: {showTextEvery: 1},
        vAxis: {viewWindow: {min: 0, max: 1.0}},
        width: 600,
        height: 240
    };

    //Draw the chart with the current data from freqData
    var lineChart = new google.visualization.LineChart(document.getElementById('freq-chart'));
    lineChart.draw(freqData, options);
}