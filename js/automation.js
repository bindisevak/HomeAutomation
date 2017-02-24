var homeAutomation = function(id, pointer, value) {

	var defer = $.Deferred();
	// console.log(id);
	// console.log(pointer);
	// console.log(value);
	var result;
	var checkValue;

	$.ajax({
		type: 'GET',
		url: 'js/data.json',
		dataType: 'json',
		success: function(myData) {
			// console.log(value);
			// console.log(myData);

			for (var i = 0; i < myData['home']['rooms'].length; i++) {
				if (value == true) {
					result = myData['home']['rooms'][i][id][pointer]['On-text'];
				}
				if (value == false) {
					result = myData['home']['rooms'][i][id][pointer]['Off-text'];
				}
				checkValue = myData['home']['rooms'][i][id][pointer]['OnValue'];
				//}
				if (checkValue !== value) {
					myData['home']['rooms'][i][id][pointer]['OnValue'] = value;
				}
			}
			defer.resolve(result);
			// console.log(result);
			// console.log(myData);

			$.ajax({
				type: 'POST',
				data: {
					data: JSON.stringify(myData)
				},
				url: 'http://localhost:3000/data',
				dataType: 'json',
				success: function(data) {
					console.log('success');
				},
			})
		},
		error: function() {
			console.log('Error loading the JSON data');
		}
	});

	return defer.promise();

};

var homeAutomationTemp = function(count) {
	$.ajax({
		type: 'GET',
		url: 'js/data.json',
		dataType: 'json',
		success: function(myData) {
			// console.log(myData);

			var temp = myData['home']['temp'];
			// console.log(temp);
			// console.log(count);
			if (temp != count) {
				myData['home']['temp'] = count;
			}

			// console.log(myData);

			$.ajax({
				type: 'POST',
				data: {
					data: JSON.stringify(myData)
				},
				url: 'http://localhost:3000/data',
				dataType: 'json',
				success: function(data) {
					console.log('success');
					console.log(JSON.stringify(data));
				},
				error: function(error) {
					console.log("Error");
				}
			})
		},
		error: function() {
			console.log('Error loading the JSON data');
		}
	});
}