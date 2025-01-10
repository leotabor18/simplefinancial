-- Up
CREATE VIEW client_business AS
SELECT 
    c.clientId,
    c.userId,
    c.firstName,
    c.lastName,
    c.email AS clientEmail,
    c.phoneNumber AS clientPhoneNumber,
    c.streetAddress AS clientStreetAddress,
    c.city AS clientCity,
    c.state AS clientState,
    c.zip AS clientZip,
    c.country AS clientCountry,
    c.type AS clientType,
    c.status AS clientStatus,
    b.businessId,
    b.name AS businessName,
    b.email AS businessEmail,
    b.phoneNumber AS businessPhoneNumber,
    b.streetAddress AS businessStreetAddress,
    b.city AS businessCity,
    b.state AS businessState,
    b.zip AS businessZip,
    b.country AS businessCountry,
    b.type AS businessType,
    b.status AS businessStatus,
    b.taxNumber AS businessTaxNumber
FROM 
    client c
LEFT JOIN clientBusiness cb ON c.clientId = cb.clientId
LEFT JOIN business b ON cb.businessId = b.businessId;

CREATE VIEW client_categories AS
SELECT 
    c.clientId,
    c.userId,
    c.firstName,
    c.lastName,
    c.email AS clientEmail,
    c.phoneNumber AS clientPhoneNumber,
    c.streetAddress AS clientStreetAddress,
    c.city AS clientCity,
    c.state AS clientState,
    c.zip AS clientZip,
    c.country AS clientCountry,
    c.type AS clientType,
    c.status AS clientStatus,
    cat.categoryId,
    cat.name AS categoryName,
    cat.description AS categoryDescription
FROM 
    client c
LEFT JOIN clientCategory cc ON c.clientId = cc.clientId
LEFT JOIN category cat ON cc.categoryId = cat.categoryId;


-- Down
--