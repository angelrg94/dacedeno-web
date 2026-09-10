const { siteContent } = await import('../src/app/core/content/site-content.ts');
const blockers = [];
const { profile, services, programs, testimonials, faqs, booking, publication } = siteContent;
const add = (condition, message) => {
  if (condition) blockers.push(message);
};

add(!publication.contentApproved, 'content approval is false');
add(!publication.privacyApproved, 'privacy approval is false');
add(!publication.bookingVerified, 'booking verification is false');
add(!publication.hostingVerified, 'hosting verification is false');
add(
  !publication.origin || !isHttpsUrl(publication.origin),
  'publication origin is empty or not HTTPS',
);
add(!publication.reviewedOn, 'publication review date is empty');
add(profile.review !== 'approved', 'profile content is not approved');
add(!isValidTimezone(profile.timezone), 'service timezone is empty or invalid');
add(
  !profile.contact.email || !/^\S+@\S+\.\S+$/.test(profile.contact.email),
  'public email is empty or invalid',
);
add(!isHttpsUrl(profile.contact.instagram), 'Instagram destination is empty or not HTTPS');
add(!isHttpsUrl(profile.contact.whatsapp), 'WhatsApp destination is empty or not HTTPS');
add(
  services.some((item) => item.review !== 'approved'),
  'one or more services are still draft',
);
add(
  programs.some((item) => item.review !== 'approved' || item.availability === 'unpublished'),
  'one or more programs are unpublished or draft',
);
add(
  faqs.some((item) => item.review !== 'approved'),
  'one or more FAQ answers are still draft',
);
add(testimonials.length < 9, 'fewer than nine testimonials are available');
add(
  testimonials.some(
    (item) => item.review !== 'approved' || !item.sourceReviewed || !item.publicationApproved,
  ),
  'one or more testimonials lack source review or publication approval',
);
add(!booking.enabled, 'booking.enabled is false');
add(!booking.allowedHosts.length, 'no booking hosts are allowlisted');
add(!booking.events.length, 'no booking events are configured');
for (const event of booking.events)
  add(
    !isAllowedBookingUrl(event.url, booking.allowedHosts),
    `booking event is not HTTPS/allowlisted: ${event.serviceId}/${event.modality}`,
  );
for (const service of services)
  for (const modality of service.modalities)
    add(
      !booking.events.some(
        (event) => event.serviceId === service.id && event.modality === modality,
      ),
      `booking mapping is missing: ${service.id}/${modality}`,
    );

function isHttpsUrl(value) {
  try {
    return new URL(value).protocol === 'https:';
  } catch {
    return false;
  }
}
function isValidTimezone(value) {
  if (!value.trim()) return false;
  try {
    new Intl.DateTimeFormat('en-US', { timeZone: value }).format();
    return true;
  } catch {
    return false;
  }
}
function isAllowedBookingUrl(value, hosts) {
  try {
    const url = new URL(value);
    return url.protocol === 'https:' && hosts.includes(url.hostname);
  } catch {
    return false;
  }
}

if (blockers.length) {
  console.error('Release blocked by owner decisions or external verification:');
  for (const blocker of blockers) console.error(`- ${blocker}`);
  process.exitCode = 1;
} else console.log('Release content gate passed.');
