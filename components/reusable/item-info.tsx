import { Dialog, DialogContent, DialogDescription, DialogHeader } from "@/components/ui/dialog"
import { DialogTitle } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from '@/components/ui/form'
import { startTransition, useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { MeasurementsSchema } from "@/schemas";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { orderInfo } from "@/actions/orderInfo";
import { Decimal } from "@prisma/client/runtime/library";

interface ItemInfoProps {
    name: string;
    type: string;
    state: boolean;
    changeState: (state: boolean) => void;
    price: number;
}

export const ItemInfo = ({name, type, state, changeState, price}: ItemInfoProps) => {
    const [error, setError] = useState<string | undefined>("");
    const [success, setSuccess] = useState<string | undefined>("");
    const [isPending, startTransition] = useTransition();

    const form = useForm<z.infer<typeof MeasurementsSchema>>({
        resolver: zodResolver(MeasurementsSchema),
        defaultValues: {
            chest: 0,
            hips: 0,
            waist: 0,
            height: 0,
        }
    });

    const onSubmit = (values: z.infer<typeof MeasurementsSchema>) => {
        const numericValues = {
            chest: Number(values.chest),
            waist: Number(values.waist),
            hips: Number(values.hips),
            height: Number(values.height)
        };

        setError("");
        setSuccess("");

        startTransition(() => {
            orderInfo(numericValues)
                .then((data) => {
                    if (data?.error) {
                        form.reset();
                        setError(data.error);
                    } else {
                        form.reset();
                        setSuccess("Measurements added successfully!");
                    }
                })
                .catch(() => setError("Something went wrong"));
        });
    };

    return (
        <Dialog open={state} onOpenChange={() => changeState(!state)}>
            <DialogContent className="sm:max-w-[400px]">
                <DialogHeader>
                    <DialogTitle className="text-xl font-semibold">
                        {name}<br/>{type} - {price}
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription>
                    <Form {...form}>
                        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="text-md font-medium grid grid-cols-2 gap-3">
                                <FormField
                                    control={form.control}
                                    name='height'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Height</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="0"
                                                    type="number"
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='hips'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Hips</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="0"
                                                    type="number"
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='chest'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Chest</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="0"
                                                    type="number"
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name='waist'
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Waist</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="0"
                                                    type="number"
                                                    onChange={(e) => field.onChange(Number(e.target.value))}
                                                    disabled={isPending}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormError message={error} />
                            <FormSuccess message={success} />
                            <Button type='submit' className='w-full' disabled={isPending}>
                                Add to cart
                            </Button>
                        </form>
                    </Form>
                </DialogDescription>
            </DialogContent>
        </Dialog>
    );
};