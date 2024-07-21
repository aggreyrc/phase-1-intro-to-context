// helpers.js
function createEmployeeRecord(data) {
    return {
      firstName: data[0],
      familyName: data[1],
      title: data[2],
      payPerHour: data[3],
      timeInEvents: [],
      timeOutEvents: []
    };
  }
  
  function createEmployeeRecords(data) {
    return data.map(createEmployeeRecord);
  }
  
  function createTimeInEvent(employee, dateTime) {
    let event = {
      type: "TimeIn",
      date: dateTime.substring(0, 10),
      hour: parseInt(dateTime.substring(11, 13)) * 100 + parseInt(dateTime.substring(14, 16))
    };
    employee.timeInEvents.push(event);
    return employee;
  }
  
  function createTimeOutEvent(employee, dateTime) {
    let event = {
      type: "TimeOut",
      date: dateTime.substring(0, 10),
      hour: parseInt(dateTime.substring(11, 13)) * 100 + parseInt(dateTime.substring(14, 16))
    };
    employee.timeOutEvents.push(event);
    return employee;
  }
  
  function hoursWorkedOnDate(employee, date) {
    let timeIns = employee.timeInEvents.filter(event => event.date === date);
    let timeOuts = employee.timeOutEvents.filter(event => event.date === date);
    let hoursWorked = 0;
    for (let i = 0; i < timeIns.length; i++) {
      hoursWorked += (timeOuts[i].hour - timeIns[i].hour) / 100;
    }
    return hoursWorked;
  }
  
  function wagesEarnedOnDate(employee, date) {
    return hoursWorkedOnDate(employee, date) * employee.payPerHour;
  }
  
  function allWagesFor(employee) {
    let wages = 0;
    employee.timeInEvents.forEach(event => {
      wages += wagesEarnedOnDate(employee, event.date);
    });
    return wages;
  }
  
  function calculatePayroll(employees) {
    return employees.reduce((total, employee) => total + allWagesFor(employee), 0);
  }
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
  };