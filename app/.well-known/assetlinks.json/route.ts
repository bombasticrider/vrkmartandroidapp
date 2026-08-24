export async function GET() {
  const assetLinks = [
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: 'com.vrkmart.app',
        sha256_cert_fingerprints: [
          'AC:C1:9C:E1:E2:B2:70:99:C7:B2:2A:71:90:D6:27:52:AF:BD:50:A7:E3:FA:07:E2:45:73:50:8E:B9:8E:DF:B9'
        ]
      }
    },
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: 'in.vrkmart.app',
        sha256_cert_fingerprints: [
          'AC:C1:9C:E1:E2:B2:70:99:C7:B2:2A:71:90:D6:27:52:AF:BD:50:A7:E3:FA:07:E2:45:73:50:8E:B9:8E:DF:B9'
        ]
      }
    },
    {
      relation: ['delegate_permission/common.handle_all_urls'],
      target: {
        namespace: 'android_app',
        package_name: 'app.vercel.vrkmartandroidapp.twa',
        sha256_cert_fingerprints: [
          'AC:C1:9C:E1:E2:B2:70:99:C7:B2:2A:71:90:D6:27:52:AF:BD:50:A7:E3:FA:07:E2:45:73:50:8E:B9:8E:DF:B9'
        ]
      }
    }
  ];

  return new Response(JSON.stringify(assetLinks), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=86400, must-revalidate',
    },
  });
}
