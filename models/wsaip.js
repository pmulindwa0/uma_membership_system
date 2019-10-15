const Joi = require('joi');
const mongoose = require('mongoose');

const wsaipSchema = new mongoose.Schema({
    // firm infromation
    member: {type: new mongoose.Schema(
      { company_name: {type: String, required: true}, 
      telephone_number:{type: String},
      physical_address:{type: String}, 
      establishment_date: {type: Date}, 
      box_number: {type: String}, 
      sector: {type: String}, 
      turnover: {type: String},
      products: {type: [ String ]},
      category: {type: String},
      district: {type: String},
      subcounty: {type: String},
      parish: {type: String},
      village: {type: String}
     }), required: true },
     dataCollector: {type: String},
    firmLevelofOperation:{type: String},
    interviewee: {type: String},
    intervieweeRoleInFirm: {type: String},
    neighborHood: {type: String},
    rawMaterialsUsed: { type: String},
    unitsOfMonthlyProduction: {type: String},
    volumeOfProductionPerMonth: {type: String},
    estimatedNumberOfPermanentEmployees: {type: String},
    estimatedNumberOfTemporaryEmployees: {type: String},
    doYouExportProducts: {type: String},
    percentageOfMarketThatIsUgandan: {type: Number},
    percentageOfMarketThatIsRegional: {type: Number},
    percentageOfMarketThatIsInternational: {type: Number},
    doYouHaveAnEnvironmentalManagementSystemInPlace: {type: String},
    environmentalManagementSystemUsed: {type: String},
    subscribeToAnyInternationalEnvironmentalStandard: {type: String},
    standardsSubscribeTo: {type: String},
    customersRequireInternationalCertification: {type: String},
    landOccupiedByFirm: {type: Number},
    // water supply and consumption
    useWaterInProduction: {type: String},
    waterSource: {type: [String]},
    waterQuantity: {type: String},
    waterSupplyMeetDemand: {type: String},
    experienceWaterShortage: {type: String},
    howOftenExperienceWaterShortage: {type: String},
    waterQualityMeetProductionStandards: {type: String},
    howImproveWaterQuality: {type: [String]},
    chemicalsForWaterPretreatment: {type: String},
    costOfTreament: {type: String},
    costHinderPretreatment: {type:String},
    waterPretreatmentMajorCostLine: {type: [String]},
    haveWaterAbstractionPermit: {type: String},
    adviceToWaterSupplierForQualityImprovement: {type: String},
    // stormWater management
    industryInSwampySurrounding: {type: String},
    floodingFrequencyInIndustry: {type: String},
    monthsWithMoreFlooding: {type: [String]},
    affectedByFlooding: {type: String},
    howAffectedByFlooding: {type: String},
    dealtWithFlooding: {type: String},
    industrialAreaPaved: {type:String},
    haveDrainageSystems: {type: String},
    harvestRainWater: {type: String},
    rainWaterHarvestingCapacity: {type: String},
    // wasteWater management
    generateWasteWaterFromProduction: {type: String},
    wasteWaterAmountGenerated: {type: String},
    collectionSystemForWasteWater: {type: String},
    wasteWaterTreatmentProcess: {type: String},
    treatmentProcessMeetDesiredOutcomes: {type: String},
    dischargeEffluentToEnvironment: {type:String},
    treatmentDischargePermit: {type:String},
    effluent_discharge_area:{type:String},
    wasteWaterMonitoringLabOnSite: {type: String},
    labMonitoringOfWasteWaterTreatment:{type: String},
    wasteWaterTreatmentInternalStandards:{type: String},
    internalVsGovStandards: {type: String},
    wasteWaterTreatmentTrainedStaff: {type: String},
    recoverproductFromWasteWater:{type: String},
    productsFromWasteWater: {type: String},
    treatWasteWaterForReuse:{type: String},
    trainingOnWasteManagement:{type: String},
    // feacal management
    toiletOnPremises:{type: String},
    typeOfToilet:{type: String},
    connectedToSewerLine:{type: String},
    separateOrCombinedSewer:{type: String},
    howEmptyToilet:{type: String},
    howOftenEmptyToilet:{type: String},
    whereDischargeFeacalSludge: {type: String},
    costOfSludgeDischarge:{type: String},
    // solid waste management
    generateSolidWaste:{type: String},
    typeOfSolidWasteGenerated: {type: String},
    amountOfSolidWasteGenerated: {type: String},
    howDisposeSolidWaste: {type: String},
    howOftenDisposeSolidWaste: {type: String},
    segregateWaste: {type: String},
    recycleWaste: {type: String},
    recoverProductsFromSolidWaste: {type: String},
    productsRecoveredFromSolidWaste: {type: String},
    generalComments:{type: String},
    dateOfCollection: {type: Date, default: Date.now},
    x_coordinates: {type: String},
    y_coordinates: {type: String}


  });
  
  const Wsaip = mongoose.model('Wsaip', wsaipSchema);
  
  function validateWsaip(wsaip) {
    const schema = {
        firm: Joi.string(),
        neighborHood: Joi.string()
    };
  
    return Joi.validate(wsaip, schema);
  }
  
  exports.Wsaip = Wsaip; 
  exports.validate = validateWsaip;
  exports.wsaipSchema = wsaipSchema;