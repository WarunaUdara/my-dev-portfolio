import { NextRequest, NextResponse } from 'next/server';
import { adminDb } from '@/lib/firebase-admin';
import { FieldValue } from 'firebase-admin/firestore';

export async function POST(req: NextRequest) {
  try {
    // Get anonymized user data
    const userAgent = req.headers.get('user-agent') || 'Unknown';
    const referer = req.headers.get('referer') || 'Direct';
    
    // Get geo data from request headers (Vercel provides these in production)
    const country = req.headers.get('x-vercel-ip-country') || 'Unknown';
    const city = req.headers.get('x-vercel-ip-city') || 'Unknown';
    const region = req.headers.get('x-vercel-ip-country-region') || 'Unknown';
    
    // Parse user agent for device info (no PII)
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(userAgent);
    const isTablet = /tablet|ipad/i.test(userAgent);
    const deviceType = isMobile ? 'mobile' : isTablet ? 'tablet' : 'desktop';
    
    // Extract browser info (no PII)
    let browser = 'Unknown';
    if (userAgent.includes('Firefox')) browser = 'Firefox';
    else if (userAgent.includes('Chrome')) browser = 'Chrome';
    else if (userAgent.includes('Safari')) browser = 'Safari';
    else if (userAgent.includes('Edge')) browser = 'Edge';
    
    // Store anonymized download event using Firebase Admin
    await adminDb.collection('cv_downloads').add({
      timestamp: FieldValue.serverTimestamp(),
      country,
      city,
      region,
      deviceType,
      browser,
      referer,
      // No IP address, no user identification - privacy first
    });

    return NextResponse.json({ 
      success: true,
      message: 'Download tracked successfully'
    }, { status: 200 });

  } catch (error) {
    console.error('Error tracking CV download:', error);
    
    // Don't block the download if tracking fails
    return NextResponse.json({ 
      success: false,
      message: 'Tracking failed but download continues',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 200 });
  }
}
