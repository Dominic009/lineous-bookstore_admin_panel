"use client";

import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandList,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Check, ChevronsUpDown, Plus, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import apiClient from "@/lib/api/axios";

export interface SearchableDropdownItem {
  id: number | string;
  label: string;
  subLabel?: string;
  [key: string]: unknown;
}

interface SearchableDropdownProps {
  items: SearchableDropdownItem[];
  value?: number | string | null;
  onChange: (item: SearchableDropdownItem | null) => void;
  placeholder?: string;
  searchPlaceholder?: string;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  buttonClassName?: string;
  enableAddNew?: boolean;
  addNewLabel?: string;
  addNewEndpoint?: string;
  addNewPayloadBuilder?: (searchValue: string) => Record<string, unknown>;
  onAddNewSuccess?: (newItem: SearchableDropdownItem) => void;
  onAddNewClick?: () => void;
  renderItem?: (item: SearchableDropdownItem, isSelected: boolean) => React.ReactNode;
}

export function SearchableDropdown({
  items,
  value,
  onChange,
  placeholder = "Select an item",
  searchPlaceholder = "Search...",
  loading = false,
  disabled = false,
  className,
  buttonClassName,
  enableAddNew = false,
  addNewLabel = "Add New",
  addNewEndpoint,
  addNewPayloadBuilder,
  onAddNewSuccess,
  onAddNewClick,
  renderItem,
}: SearchableDropdownProps) {
  const [open, setOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [isCreating, setIsCreating] = useState(false);

  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
    if (!newOpen) {
      setSearchValue("");
      setIsCreating(false);
    }
  };

  const filteredItems = searchValue.trim()
    ? items.filter((item) =>
        item?.label?.toLowerCase().includes(searchValue.toLowerCase())
      )
    : items;

  const selectedItem = items.find((item) => item.id === value) || 
    (value ? { id: value, label: String(value) } : null);

  const handleSelect = (item: SearchableDropdownItem) => {
    onChange(item);
    setOpen(false);
    setSearchValue("");
  };

  const handleAddNew = async () => {
    if (!addNewEndpoint || !addNewPayloadBuilder || !searchValue.trim()) {
      return;
    }

    setIsCreating(true);
    try {
      const payload = addNewPayloadBuilder(searchValue.trim());
      const res = await apiClient.post(addNewEndpoint, payload);

      toast.success(`${addNewLabel} created successfully`, {
        className: "bg-emerald-600 text-white",
      });

      const newItem: SearchableDropdownItem = {
        id: res.data?.id || Date.now(),
        label: res.data?.supplier_name || res.data?.item_name || searchValue.trim(),
        subLabel: res.data?.category_name || res.data?.supplier_type,
        ...res.data,
      };

      onAddNewSuccess?.(newItem);
      onChange(newItem);
      setOpen(false);
      setSearchValue("");
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } }; message?: string };
      toast.error(
        err?.response?.data?.message || `Failed to create ${addNewLabel.toLowerCase()}`
      );
    } finally {
      setIsCreating(false);
    }
  };

  const hasNoResults = searchValue.trim() && filteredItems.length === 0;
  
  const showAddNewOption = enableAddNew && 
    hasNoResults && 
    !loading &&
    !isCreating;

  const showCreateButton = onAddNewClick && !loading;

  return (
    <Popover open={open} onOpenChange={handleOpenChange}>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          disabled={disabled}
          className={cn(
            "w-full h-10 justify-between font-normal transition-all duration-200",
            "border-slate-200 hover:border-slate-300 hover:bg-slate-50",
            !selectedItem && "text-slate-400 font-medium",
            buttonClassName
          )}
        >
          <span
            className={selectedItem ? "text-slate-900" : "font-medium text-gray-500"}
          >
            {selectedItem ? selectedItem.label : placeholder}
          </span>
          <ChevronsUpDown className="h-4 w-4 shrink-0 text-slate-400" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className={cn( "w-[--radix-popover-trigger-width] p-0 flex flex-col", className)}
        align="start"
      >
        <Command className="rounded-lg">
          <div className="flex h-12 items-center gap-2 border-b border-border/60 px-3">
            <input
              type="text"
              placeholder={searchPlaceholder}
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="max-h-[50vh] flex-1 rounded-none border-0 bg-transparent px-0 py-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-0 focus:ring-offset-0"
            />
          </div>
          <CommandList className="">
            {loading && (
              <div className="py-3 text-sm text-slate-500 text-center flex items-center justify-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading...</span>
              </div>
            )}
            
            {!loading && hasNoResults && (
              <div className="py-3 text-sm text-slate-500 text-center">
                No items found
              </div>
            )}
            
            {showCreateButton && (
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  onAddNewClick();
                }}
                className="cursor-pointer bg-blue-50 hover:bg-blue-100 text-blue-700 aria-selected:bg-blue-100"
              >
                <Plus className="h-4 w-4 mr-2" />
                <span className="flex-1 font-medium">
                  Add {addNewLabel}
                </span>
              </CommandItem>
            )}

            {showAddNewOption && (
              <CommandItem
                onSelect={handleAddNew}
                className="cursor-pointer bg-emerald-50 hover:bg-emerald-100 text-emerald-700 aria-selected:bg-emerald-100"
              >
                {isCreating ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Plus className="h-4 w-4 mr-2" />
                )}
                <span className="flex-1 font-medium">
                  + Add &quot;{searchValue.trim()}&quot;
                </span>
              </CommandItem>
            )}

            {!loading && filteredItems.length > 0 && (
              <CommandGroup>
                {filteredItems.map((item) => (
                  <CommandItem
                    key={item.id}
                    onSelect={() => handleSelect(item)}
                    className="cursor-pointer"
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4 text-emerald-600",
                        value === item.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {renderItem ? (
                      renderItem(item, value === item.id)
                    ) : (
                      <>
                        <span className="flex-1">{item.label}</span>
                        {item.subLabel && (
                          <span className="text-xs text-slate-400 ml-2">
                            {item.subLabel}
                          </span>
                        )}
                      </>
                    )}
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export default SearchableDropdown;