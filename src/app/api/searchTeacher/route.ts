// src/app/api/search/route.ts
// Import mock data and types
import { mockUserData } from '@/mock/mock_user_data';
import { NextResponse } from 'next/server';

// Map team color to team name
function mapTeamName(teamColor: string) {
  switch (teamColor) {
    case 'ชมพู':
      return 'เอราวัณ';
    case 'แดง':
      return 'หงส์เพลิง';
    case 'เหลือง':
      return 'กิเลนทองคำ';
    case 'เขียว':
      return 'นาคา';
    case 'น้ำเงิน':
      return 'สุบรรณนที';
    default:
      return 'Unknown';
  }
}

// GET handler for the route
export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const username = url.searchParams.get('username');

    if (!username) {
      return NextResponse.json({ success: false, message: 'Username is required' }, { status: 400 });
    }

    const user = mockUserData.find((user) => user.name.includes(username));
    const teamMembers = mockUserData.filter((data) => data.team === user?.team);

    if (user?.position === 'นิสิต') {
      return NextResponse.json({ success: false, message: 'ไม่พบข้อมูล' }, { status: 404 });
    }

    if (!user) {
      return NextResponse.json({ success: false, message: 'User not found' }, { status: 404 });
    }

    const response = {
      success: true,
      data: {
        username: user.username,
        fullName: user.name,
        role: user.position,
        teamName: mapTeamName(user.team ?? 'Unknown'),
        teamColor: user.team,
        members: teamMembers,
      },
    };

    return NextResponse.json(response, { status: 200 });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return NextResponse.json({ success: false, message: errorMessage }, { status: 500 });
  }
}

// Reject unsupported methods
export async function POST() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function PUT() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}

export async function DELETE() {
  return NextResponse.json({ message: 'Method Not Allowed' }, { status: 405 });
}
