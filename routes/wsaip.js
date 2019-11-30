const {Wsaip, validate} = require('../models/wsaip');
const {Member} = require('../models/membership');
const csv = require('fast-csv');
const json2csv = require('json2csv');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/questionnaire', async(req,res) => {
    const members = await Member.find().sort('-created_on');
    res.render('wsaip_questionnaire', {title: "Data Collection Tool", members:members, user: req.user})
});

router.post('/questionnaire', async(req, res)=>{
    console.log(req.body);
    const { error } = validate(req.body); // Destructuring
    // if (error) return res.status(400).send(error.details[0].message);
    // if (error) {
    //     req.flash('error', error.details[0].message);
    //     res.redirect('/wsaip/questionnaire');
    // }

    const member = await Member.findById(req.body.firm);
    if(!member) return res.status(400).send('Invalid member..');

    let wsaip = new Wsaip({ 
        member: {
            _id: member._id,
            company_name: member.company_name,
            telephone_number: member.telephone_number,
            physical_address: member.physical_address,
            establishment_date: member.establishment_date,
            box_number: member.box,
            sector: member.sector,
            products: member.products
          },
        firmLevelofOperation:req.body.operation_level,
        interviewee: req.body.interviewee,
        intervieweeRoleInFirm: req.body.interviewee_role,
        neighborHood: req.body.neighborhood,
        rawMaterialsUsed: req.body.raw_materials,
        unitsOfMonthlyProduction: req.body.production_units,
        volumeOfProductionPerMonth: req.body.volume_of_production,
        estimatedNumberOfPermanentEmployees: req.body.permanent_employees,
        estimatedNumberOfTemporaryEmployees: req.body.temporary_employees,
        doYouExportProducts: req.body.export_products,
        percentageOfMarketThatIsUgandan: req.body.ugandan_market,
        percentageOfMarketThatIsRegional: req.body.regional_market,
        percentageOfMarketThatIsInternational: req.body.international_market,
        doYouHaveAnEnvironmentalManagementSystemInPlace: req.body.environmental_management_system,
        environmentalManagementSystemUsed: req.body.environmental_management_system_used,
        subscribeToAnyInternationalEnvironmentalStandard: req.body.standards_subscription,
        standardsSubscribeTo: req.body.international_standards,
        customersRequireInternationalCertification: req.body.international_certification,
        landOccupiedByFirm: req.body.land_size,
        useWaterInProduction: req.body.use_water,
        waterSource: req.body.water_source,
        waterQuantity: req.body.qty_of_water,
        waterSupplyMeetDemand: req.body.meet_demand,
        experienceWaterShortage: req.body.water_shortage,
        howOftenExperienceWaterShortage: req.body.water_shortage_times,
        waterQualityMeetProductionStandards: req.body.water_quality,
        howImproveWaterQuality: req.body.improving_quality,
        chemicalsForWaterPretreatment: req.body.chemicals_for_treatment,
        costOfTreament: req.body.treatment_cost,
        costHinderPretreatment: req.body.cost_of_operating,
        waterPretreatmentMajorCostLine: req.body.major_treatment_costs,
        haveWaterAbstractionPermit: req.body.abstraction_permit,
        adviceToWaterSupplierForQualityImprovement: req.body.advice_improve_water_quality,
        industryInSwampySurrounding: req.body.industry_in_swamp,
        floodingFrequencyInIndustry: req.body.freq_of_flooding,
        monthsWithMoreFlooding: req.body.flooding_months,
        affectedByFlooding: req.body.affected_by_flooding,
        howAffectedByFlooding: req.body.how_affected_by_flooding,
        dealtWithFlooding: req.body.dealt_with_flooding,
        industrialAreaPaved: req.body.area_paved,
        haveDrainageSystems: req.body.drainage_system,
        harvestRainWater: req.body.harvest_rain_water,
        rainWaterHarvestingCapacity: req.body.harvest_capacity,
        generateWasteWaterFromProduction: req.body.generate_wastewater,
        wasteWaterAmountGenerated: req.body.amount_of_wastewater,
        collectionSystemForWasteWater: req.body.collection_system_wastewater,
        wasteWaterTreatmentProcess: req.body.wastewater_treatment_process,
        treatmentProcessMeetDesiredOutcomes: req.body.treatment_meet_needs,
        dischargeEffluentToEnvironment: req.body.effluents_to_environment,
        treatmentDischargePermit: req.body.treatment_discharge_permit,
        effluent_discharge_area:req.body.effluent_discharge_area,
        wasteWaterMonitoringLabOnSite: req.body.monitoring_laboratory,
        labMonitoringOfWasteWaterTreatment: req.body.often_monitor_laboratory,
        wasteWaterTreatmentInternalStandards: req.body.set_internal_standards,
        internalVsGovStandards: req.body.internal_vs_gov_standard,
        wasteWaterTreatmentTrainedStaff: req.body.trained_staff,
        recoverproductFromWasteWater: req.body.products_from_wastewater,
        productsFromWasteWater: req.body.product_name_from_wastewater,
        treatWasteWaterForReuse:req.body.treat_for_reuse,
        trainingOnWasteManagement: req.body.training_on_waste,
        toiletOnPremises:req.body.have_latrine,
        typeOfToilet: req.body.type_of_latrine,
        connectedToSewerLine:req.body.connected_to_sewerline,
        separateOrCombinedSewer:req.body.separate_or_combined_sewer,
        howEmptyToilet: req.body.how_empty_toilet,
        howOftenEmptyToilet: req.body.often_empty_toilet,
        whereDischargeFeacalSludge: req.body.where_discharge_sludge,
        costOfSludgeDischarge: req.body.cost_discharge_sludge,
        generateSolidWaste: req.body.generate_solid_waste,
        typeOfSolidWasteGenerated: req.body.type_of_solid_waste,
        amountOfSolidWasteGenerated: req.body.solid_waste_generated,
        howDisposeSolidWaste: req.body.how_dispose_solid_waste,
        howOftenDisposeSolidWaste: req.body.often_dispose_solid_waste,
        segregateWaste: req.body.segregate_waste,
        recycleWaste: req.body.recycle_waste,
        recoverProductsFromSolidWaste: req.body.recover_product_from_solid_waste,
        productsRecoveredFromSolidWaste: req.body.products_recovered,
        generalComments: req.body.general_comment
    });

    wsaip = await wsaip.save();

    if (!wsaip) {
        req.flash('error', "Server Failure, Unable to capture data");
        res.redirect('/wsaip/questionnaire');
    }
    req.flash('info', "Data successfully captured");
    res.redirect('/wsaip/questionnaire');
});

router.get('/upload', async(req,res) => {
    // const members = await Member.find().sort('-created_on');
    res.render('wsaip_upload', {title: "Upload CSV data file", user: req.user})
});

router.post('/upload', async(req, res) =>{
    if (!req.files) {
        // return res.status(400).send('No file upload.');
        req.flash('error', 'No file upload.');
        res.redirect('/wsaip/upload');
    }

    const dataFile = req.files.file;

    const wsaipData = [];

    csv
.fromString(dataFile.data.toString(), {
    headers: true,
    ignoreEmpty: true
})
.on("data", function(data){
    data['_id'] = new mongoose.Types.ObjectId();

    wsaipData.push(data)
})
.on("end", function(){
    Wsaip.create(wsaipData, function(err, documents) {
       if (err) throw err;
    });
     
    // res.send(members.length + ' members have been successfully uploaded.');
    req.flash('info', wsaipData.length + ' successful form entries.');
    res.redirect('/wsaip/upload');
});
});

router.get('/data', async(req,res) => {
    const wsaipData = await Wsaip.find().sort('-created_on');
    const district = await Wsaip.distinct("member.district");
    const sectors = await Wsaip.distinct("member.sector");
    const employees = await Wsaip.distinct("estimatedNumberOfPermanentEmployees");
    const turnover = await Wsaip.distinct("member.turnover");
    const dataString = JSON.stringify(wsaipData);
    res.render('wsaip_reports', {title: "Collected Data", wsaipData: wsaipData, dataString:dataString, user: req.user, district: district, sectors: sectors, employees: employees, turnover: turnover});
});

router.post('/data', async(req, res)=>{
    // console.log(req.body);
    let queryIn = req.body.query;
    let district = req.body.district;
    let employees = req.body.employees;
    let sectors = req.body.sectors;
    let turnover = req.body.turnover;
    let waterUsage = req.body.water_usage;

    if (district === undefined) {
        district = ['Kampala', 'Mukono', 'Wakiso'];
     }

     if (employees === undefined) {
        employees = await Wsaip.distinct("estimatedNumberOfPermanentEmployees");
     }
     
     if (sectors === undefined) {
        sectors = await Wsaip.distinct("member.sector");
     }

     if (turnover === undefined) {
        turnover = await Wsaip.distinct("member.turnover");
     }
     if (waterUsage === undefined) {
        waterUsage = await Wsaip.distinct("waterQuantity");
     }

    queryObj={};
    let queryArr;
    if (Array.isArray(queryIn)) {
        queryArr = queryIn;
    }else{
        queryArr = new Array(queryIn);
    }
    // console.log(`Query : ${queryIn}`);
    // console.log(`District: ${district}`);

    queryArr.map(
        (value, index) => {
            queryObj[`${value}`] = "Yes";
            // temp_obj[value] = "";
            return queryObj;
        }
    );

    let result = Object.keys(queryObj).map(e => {
        let ret = {};
        ret[e] = queryObj[e];
        return ret;
    });
    // console.log(result);
    let wsaipData = '';
    if (queryIn === undefined) {
        wsaipData = await Wsaip.find(
            {'member.district': { $in: district }, 
            'estimatedNumberOfPermanentEmployees':{ $in: employees}, 
            'member.sector': {$in: sectors}, 
            'member.turnover': {$in: turnover}, 
            'waterQuantity': {$in: waterUsage}}
          );
     }else{
        wsaipData = await Wsaip.find(
            {'member.district': { $in: district }, 
            'estimatedNumberOfPermanentEmployees':{ $in: employees}, 
            'member.sector': {$in: sectors}, 
            'member.turnover': {$in: turnover}, 
            'waterQuantity': {$in: waterUsage},
            $and: result}
          );
     }
     
    // res.redirect('/wsaip/data');
    res.render('wsaip_reports', {title: "Search Results", wsaipData: wsaipData, user: req.user, district: await Wsaip.distinct("member.district"), sectors: await Wsaip.distinct("member.sector"), turnover: await Wsaip.distinct("member.turnover")});
    // res.send(wsaipData);
});
router.get('/data/:id', async(req,res) => {
    const wsaipCompany = await Wsaip.findById(req.params.id);
  
    if (!wsaipCompany) {
        req.flash('error','Invalid selection.');
        res.redirect('/wsaip/data');
    }
  
    res.render('wsaip_company_profile', {title: wsaipCompany.member.company_name, data: wsaipCompany, user: req.user})
});
router.delete('/data/:id', async (req, res) => {
    const wsaip = await Wsaip.findByIdAndRemove(req.params.id);
  
    if (!wsaip) return res.status(404).send('The response with the given ID was not found.');
    
    res.sendStatus(200);
  });

router.get('/coordinates/:data', async(req, res) =>{
    const response = req.params.data;
    console.log('hello')
    res.send("response");
});

router.get('/update/:id', async (req, res) => {
    // res.render('wsaip_update', {title: `ID: ${req.params.id}`});
    const wsaipInfo = await Wsaip.findById(req.params.id);
  
    if (!wsaipInfo) {
        req.flash('error','Data not found!');
        res.redirect('/wsaip/data');
    }
  
    res.render('wsaip_update', {title: `ID: ${req.params.id}`, wsaipInfo: wsaipInfo, user: req.user})
  });

  router.post('/update/:id', async (req, res) => {
    
    const wsaipUpdate = await Wsaip.findByIdAndUpdate(req.params.id, { 

        // company_name: member.company_name,
        firmLevelofOperation:req.body.operation_level,
        interviewee: req.body.interviewee,
        intervieweeRoleInFirm: req.body.interviewee_role,
        neighborHood: req.body.neighborhood,
        rawMaterialsUsed: req.body.raw_materials,
        unitsOfMonthlyProduction: req.body.production_units,
        volumeOfProductionPerMonth: req.body.volume_of_production,
        estimatedNumberOfPermanentEmployees: req.body.permanent_employees,
        estimatedNumberOfTemporaryEmployees: req.body.temporary_employees,
        doYouExportProducts: req.body.export_products,
        percentageOfMarketThatIsUgandan: req.body.ugandan_market,
        percentageOfMarketThatIsRegional: req.body.regional_market,
        percentageOfMarketThatIsInternational: req.body.international_market,
        doYouHaveAnEnvironmentalManagementSystemInPlace: req.body.environmental_management_system,
        environmentalManagementSystemUsed: req.body.environmental_management_system_used,
        subscribeToAnyInternationalEnvironmentalStandard: req.body.standards_subscription,
        standardsSubscribeTo: req.body.international_standards,
        customersRequireInternationalCertification: req.body.international_certification,
        landOccupiedByFirm: req.body.land_size,
        useWaterInProduction: req.body.use_water,
        waterSource: req.body.water_source,
        waterQuantity: req.body.qty_of_water,
        waterSupplyMeetDemand: req.body.meet_demand,
        experienceWaterShortage: req.body.water_shortage,
        howOftenExperienceWaterShortage: req.body.water_shortage_times,
        waterQualityMeetProductionStandards: req.body.water_quality,
        howImproveWaterQuality: req.body.improving_quality,
        chemicalsForWaterPretreatment: req.body.chemicals_for_treatment,
        costOfTreament: req.body.treatment_cost,
        costHinderPretreatment: req.body.cost_of_operating,
        waterPretreatmentMajorCostLine: req.body.major_treatment_costs,
        haveWaterAbstractionPermit: req.body.abstraction_permit,
        adviceToWaterSupplierForQualityImprovement: req.body.advice_improve_water_quality,
        industryInSwampySurrounding: req.body.industry_in_swamp,
        floodingFrequencyInIndustry: req.body.freq_of_flooding,
        monthsWithMoreFlooding: req.body.flooding_months,
        affectedByFlooding: req.body.affected_by_flooding,
        howAffectedByFlooding: req.body.how_affected_by_flooding,
        dealtWithFlooding: req.body.dealt_with_flooding,
        industrialAreaPaved: req.body.area_paved,
        haveDrainageSystems: req.body.drainage_system,
        harvestRainWater: req.body.harvest_rain_water,
        rainWaterHarvestingCapacity: req.body.harvest_capacity,
        generateWasteWaterFromProduction: req.body.generate_wastewater,
        wasteWaterAmountGenerated: req.body.amount_of_wastewater,
        collectionSystemForWasteWater: req.body.collection_system_wastewater,
        wasteWaterTreatmentProcess: req.body.wastewater_treatment_process,
        treatmentProcessMeetDesiredOutcomes: req.body.treatment_meet_needs,
        dischargeEffluentToEnvironment: req.body.effluents_to_environment,
        treatmentDischargePermit: req.body.treatment_discharge_permit,
        effluent_discharge_area:req.body.effluent_discharge_area,
        wasteWaterMonitoringLabOnSite: req.body.monitoring_laboratory,
        labMonitoringOfWasteWaterTreatment: req.body.often_monitor_laboratory,
        wasteWaterTreatmentInternalStandards: req.body.set_internal_standards,
        internalVsGovStandards: req.body.internal_vs_gov_standard,
        wasteWaterTreatmentTrainedStaff: req.body.trained_staff,
        recoverproductFromWasteWater: req.body.products_from_wastewater,
        productsFromWasteWater: req.body.product_name_from_wastewater,
        treatWasteWaterForReuse:req.body.treat_for_reuse,
        trainingOnWasteManagement: req.body.training_on_waste,
        toiletOnPremises:req.body.have_latrine,
        typeOfToilet: req.body.type_of_latrine,
        connectedToSewerLine:req.body.connected_to_sewerline,
        separateOrCombinedSewer:req.body.separate_or_combined_sewer,
        howEmptyToilet: req.body.how_empty_toilet,
        howOftenEmptyToilet: req.body.often_empty_toilet,
        whereDischargeFeacalSludge: req.body.where_discharge_sludge,
        costOfSludgeDischarge: req.body.cost_discharge_sludge,
        generateSolidWaste: req.body.generate_solid_waste,
        typeOfSolidWasteGenerated: req.body.type_of_solid_waste,
        amountOfSolidWasteGenerated: req.body.solid_waste_generated,
        howDisposeSolidWaste: req.body.how_dispose_solid_waste,
        howOftenDisposeSolidWaste: req.body.often_dispose_solid_waste,
        segregateWaste: req.body.segregate_waste,
        recycleWaste: req.body.recycle_waste,
        recoverProductsFromSolidWaste: req.body.recover_product_from_solid_waste,
        productsRecoveredFromSolidWaste: req.body.products_recovered,
        generalComments: req.body.general_comment
   }, {
      new: true
    });
  
    if (!wsaipUpdate) {
        req.flash('error','Response not found!');
        res.redirect('/wsaip/data');
    }
  
    req.flash('info','Response successfully updated!');
    res.redirect('/wsaip/data');
  });
    
module.exports = router;