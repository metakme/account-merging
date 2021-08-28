const merge = (accounts) => {
  //every email will point to a person record instance, if a user has multiple emais, each email will point to the same object instance (with exceptions)
  const emailIndex = {};

  accounts.forEach(acc => {
    //query emailIndex and filter all unique object instances
    const records = new Set(acc.emails.map(email => emailIndex[email]).filter(acc => acc));
    if(records.size === 0) {
      //new record is crated if there are no records for current emails
      const newPersonRecord = {
        applications: new Set(),
        emails: new Set(),
        name: acc.name
      };
      records.add(newPersonRecord);
    }

    let mergedRecord;
    //merge the records if there is more than one instance (this happens if a new email connects two previously separate records)
    records.forEach(rec => {
      if(!mergedRecord) {
        mergedRecord = rec;
      } else {
        mergedRecord.applications.add(...rec.applications.values());
        mergedRecord.emails.add(...rec.emails.values());
      }
    });

    //add new data to the merged record
    mergedRecord.applications.add(acc.application);
    acc.emails.forEach(email => {
      mergedRecord.emails.add(email);
      emailIndex[email] = mergedRecord;
    });
  });

  //remove duplicates from final index
  const uniqueRecords = Array.from(new Set(Object.values(emailIndex)));
  //convert sets to arrays
  const mergedStringified = uniqueRecords.map(({ applications, emails, name }) => ({
    applications: Array.from(applications),
    emails: Array.from(emails),
    name,
  }));

  return mergedStringified;
}

module.exports = merge;
