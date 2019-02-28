d3.csv("CITES_Trafficking_edited.csv", function(data){
    console.log("csv:", data);

    var countryNames = {

    }

    data.forEach(function(d,i){
        d.fullname=countryNames[d.countryNames]
    })
    var groupedImportCountries =d3.nest()
    .key(function(d){
        return d.Importer;
    })
    .entries(data);
    
        
    var groupedExportCountries =d3.nest()
    .key(function(d){
        return d.Importer;
    })
    .entries(data);
    
    groupedImportCountries.array.forEach(function(d){
        d.ImportCountryTotal=d3.sum("Importer reported quantity") 
    });
    
    groupedExportCountries.array.forEach(function(d){
        d.ExportCountryTotal=d3.sum("Exporter reported quantity") 
        });

});

