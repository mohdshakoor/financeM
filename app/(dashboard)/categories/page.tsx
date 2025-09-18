'use client';

import { useNewCategory } from '@/features/categories/hooks/use-new-category';
import { useBulkDeleteCategories } from '@/features/categories/api/use-bulk-delete-categories';
import { useGetCategories } from '@/features/categories/api/use-get-categories';
import { DataTable } from '@/components/data-table';
import { columns } from '@/app/(dashboard)/categories/columns';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Loader2 } from 'lucide-react';
import { DateFilter } from '@/components/date-filter';
import { Skeleton } from '@/components/ui/skeleton';

export default function CategoriesClient() {
  const newCategory = useNewCategory();
  const deleteCategories = useBulkDeleteCategories();
  const categoriesQuery = useGetCategories();

  const isDisabled = categoriesQuery.isLoading || deleteCategories.isPending;
  const categories = categoriesQuery.data || [];

  // Loading state
  if (categoriesQuery.isLoading) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <Skeleton className="h-8 w-48" />
          </CardHeader>
          <CardContent>
            <div className="h-[500px] w-full flex items-center justify-center">
              <Loader2 className="size-6 text-slate-300 animate-spin" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Error state
  if (categoriesQuery.isError) {
    return (
      <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
        <Card className="border-none drop-shadow-sm">
          <CardHeader>
            <CardTitle>Error loading categories</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{categoriesQuery.error?.message || 'Something went wrong.'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
      <Card className="border-none drop-shadow-sm">
        <CardHeader className="flex flex-col gap-y-2 lg:flex-row lg:items-center lg:justify-between">
          <CardTitle className="text-xl line-clamp-1">Categories page</CardTitle>
          <Button onClick={newCategory.onOpen} size="sm">
            <Plus className="size-4 mr-2" /> Add new
          </Button>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <DateFilter />
          <DataTable
            filterKey="name"
            columns={columns}
            data={categories}
            onDelete={(rows) => {
              const ids = rows.map((r) => r.original.id);
              deleteCategories.mutate({ ids });
            }}
            disabled={isDisabled}
          />
        </CardContent>
      </Card>
    </div>
  );
}
