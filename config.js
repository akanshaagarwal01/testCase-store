(function () {
	const staticColumns = [
		{
			type: "text",
            name: "endPoint",
            label: "End Point",
            required: true
		},
		{
			type: "text",
            name: "portNumber",
            label: "Port Number",
            required: true
		}
	];
	const columns = [
		{
            type: "text",
            name: "id",
            label: "Id",
            required: true
        },
		{
            type: "text",
            name: "testCaseId",
            label: "Test Case Id",
            required: true
        },
		{
            type: "text",
            name: "dependsOn",
            label: "Depends On",
            required: false
        },
		{
            type: "textarea",
            name: "testScenario",
            label: "Test Scenario",
            required: false
        },
		{
            type: "text",
            name: "testStep",
            label: "Test Step",
            required: false
        },
		{
            type: "select",
            name: "type",
            label: "Type",
			options: ["GET","PUT","POST","DELETE"],
			selected: "POST",
            required: true
        },
		{
            type: "text",
            name: "apiPath",
            label: "API Path",
            required: true
        },
		{
            type: "textarea",
            name: "header",
            label: "Header",
            required: false,
			validateJSON: true
        },
		{
            type: "textarea",
            name: "params",
            label: "Params",
            required: false,
			validateJSON: true
        },
		{
            type: "textarea",
            name: "requestBody",
            label: "Request Body",
            required: false,
			validateJSON: true
        },
		{
            type: "number",
            name: "responseCode",
            label: "Response Code",
            required: true
        },
		{
            type: "textarea",
            name: "responseBody",
            label: "Response Body",
            required: false,
			validateJSON: true
        }
	];
	window.columns = columns;
	window.staticColumns = staticColumns;
})();