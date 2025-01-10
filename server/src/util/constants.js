export const SEVERITY = Object.freeze({
  ERROR: 'ERROR',
  DEBUG: 'DEBUG',
  INFO : 'INFO',
});

export const USER_ORGANIZATIONS = Object.freeze({
  MANAGEMENT: 'management',
  CLIENT    : 'client'
})

export const USER_ROLES = Object.freeze({
  MANAGEMENT: 'MANAGEMENT',
  CLIENT    : 'CLIENT'
})

export const USER_ROLE_KEYS = Object.freeze({
  MANAGEMENT: 'role_management',
  CLIENT    : 'role_client'
})

export const KINDE_USER_PROPERTY_KEYS = Object.freeze({
  STREET_ADDRESS: 'kp_usr_street_address',
  CITY          : 'kp_usr_city',
  STATE         : 'kp_usr_state_region',
  ZIP           : 'kp_usr_postcode',
  MIDDLE_NAME   : 'kp_usr_middle_name',
  COMPANY_NAME  : 'cstm_usr_company',
  JOB_TITLE     : 'kp_usr_job_title',
  PHONE_NUMBER  : 'cstm_usr_phone_number',
  COUNTRY       : 'cstm_usr_country',
  STATUS        : 'cstm_usr_status',
})

export const USER_PROPERTIES = Object.freeze({
  MIDDLE_NAME   : 'Middle name',
  PHONE_NUMBER  : 'Phone Number',
  COMPANY       : 'Company',
  STREET_ADDRESS: 'Street Address',
  CITY          : 'City',
  STATE         : 'State/Region',
  ZIP           : 'Postcode',
  COUNTRY       : 'Country',
  STATUS        : 'Status'
})