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
            required: true,
			width: 100
        },
		{
            type: "text",
            name: "testCaseId",
            label: "Test-Case-Id",
            required: true,
			width: 150
        },
		{
            type: "text",
            name: "dependsOn",
            label: "Depends-On",
            required: false,
			width: 200
        },
		{
            type: "textarea",
            name: "testScenario",
            label: "Test-Scenario",
            required: false,
			width: 200
        },
		{
            type: "text",
            name: "testStep",
            label: "Test-Step",
            required: false,
			width: 150
        },
		{
            type: "select",
            name: "type",
            label: "Type",
			options: ["GET","PUT","POST","DELETE"],
			selected: "GET",
            required: true,
			width: 100
        },
		{
            type: "text",
            name: "apiPath",
            label: "API-Path",
            required: true,
			width: 200
        },
		{
            type: "textarea",
            name: "header",
            label: "Header",
            required: false,
			validateJSON: true,
			width: 300
        },
		{
            type: "textarea",
            name: "params",
            label: "Params",
            required: false,
			validateJSON: true,
			width: 300
        },
		{
            type: "textarea",
            name: "requestBody",
            label: "Request-Body",
            required: false,
			validateJSON: true,
			width: 300
        },
		{
            type: "number",
            name: "responseCode",
            label: "Response-Code",
            required: true,
			width: 100
        },
		{
            type: "textarea",
            name: "responseBody",
            label: "Response-Body",
            required: false,
			validateJSON: true,
			width: 300
        }
	];
	window.columns = columns;
	window.staticColumns = staticColumns;
})();