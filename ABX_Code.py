def handler(context, inputs):
    
    outputs = {}
    print("Executing ABX...")
    
    app_crit = inputs.customProperties.app_criticality
    env = inputs.environment
    outputs.customProperties = inputs.customProperties
    
    # Make sure the object passed in is a disk (the objectType is defined on my Blueprint because I'm sharing this script for multiple subscriptions)
    if inputs.customProperties.objectType == "disk":
        outputs.customProperties.dataStore = "datastore1"

    return outputs
    
  # Payload for customProperties looks like this
  """ 
  customProperties": {
    "objectType": "disk",
    "environment": "DEV",
    "app_criticality": "1",
    "provisioningType": "thin"
  }
  """