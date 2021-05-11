let activities = [
    ['Work', 9],
    ['Eat', 1],
    ['Commute', 2],
    ['Play Game', 1],
    ['Sleep', 7]
];


for (let i = 0; i < activities.length; i++) {
    // get the size of the inner array
    var innerArrayLength = activities[i].length;
    // loop the inner array
    for (let j = 0; j < innerArrayLength; j++) {
        console.log('[' + i + ',' + j + '] = ' + activities[i][j]);
    }
}
console.log(activities);

text = "<ul>";
for (i = 0; i < activities[i].length; i++) {
  text += "<li>" + activities[i] + "</li>";
}
text += "</ul>";

document.getElementById("demo").innerHTML = activities;