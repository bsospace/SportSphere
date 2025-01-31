import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Flag } from 'lucide-react';

const MatchEndConfirmation = ({ onEndMatch }) => {
  const handleConfirmEnd = async () => {
    try {
      await onEndMatch();
    } catch (error) {
      console.error("Error ending match:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className='flex items-center gap-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors'>
          <Flag size={20} />
          จบการแข่ง
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-xl font-bold">
            ยืนยันการจบการแข่งขัน
          </AlertDialogTitle>
          <AlertDialogDescription className="text-base text-gray-600">
            คุณต้องการจบการแข่งขันนี้ใช่หรือไม่?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="gap-2">
          <AlertDialogCancel className="mt-0">
            ยกเลิก
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmEnd}
            className="bg-red-500 text-white hover:bg-red-600"
          >
            ยืนยัน
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default MatchEndConfirmation;