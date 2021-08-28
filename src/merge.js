const merge = (accounts) => {
  const emailIndex = {};

  accounts.forEach(acc => {
    const records = new Set(acc.emails.map(email => emailIndex[email]).filter(acc => acc));
    if(records.size === 0) {
      const newPersonRecord = {
        applications: new Set(),
        emails: new Set(),
        name: acc.name
      };
      records.add(newPersonRecord);
    }

    let mergedRecord;
    records.forEach(rec => {
      if(!mergedRecord) {
        mergedRecord = rec;
      } else {
        mergedRecord.applications.add(...rec.applications.values());
        mergedRecord.emails.add(...rec.emails.values());
      }
    });

    mergedRecord.applications.add(acc.application);
    acc.emails.forEach(email => {
      mergedRecord.emails.add(email);
      emailIndex[email] = mergedRecord;
    });
  });

  const uniqueRecords = Array.from(new Set(Object.values(emailIndex)));
  const mergedStringified = uniqueRecords.map(({ applications, emails, name }) => ({
    applications: Array.from(applications),
    emails: Array.from(emails),
    name,
  }));

  return mergedStringified;
}

module.exports = merge;
