import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function page() {
  return (
    <div className="wfull hfull flex justify-center items-center">
      <Card>
        <CardHeader>
          <CardTitle>Card</CardTitle>
        </CardHeader>
        <CardContent>
          <Input type="text" placeholder="Enter your name" />
        </CardContent>
      </Card>
    </div>
  );
}
